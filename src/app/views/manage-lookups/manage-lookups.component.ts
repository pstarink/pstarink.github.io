import { Component, OnInit, ViewChild } from '@angular/core'
import { MenuItem, MessageService, TreeNode } from 'primeng/api'
import { ContainerModel, Lookup } from '@shared/entities'
import { Picklists, Profile } from '@shared/models'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { BizService, PyramidService } from '@services'
import { TreeTable } from 'primeng/treetable'
import { NotifyService } from '@app/components'
import { StoreService } from '@app/services/store.service'
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms'
import { animate, style, transition, trigger } from '@angular/animations'
import { scaleInOutAnimation } from '@app/animations'

@UntilDestroy()
@Component({
  selector: 'lookups',
  templateUrl: './manage-lookups.component.html',
  styleUrls: ['./manage-lookups.component.scss'],
  providers: [MessageService],
  animations: [
    scaleInOutAnimation,
    trigger("grow", [
      // Note the trigger name
      transition(":enter", [
        // :enter is alias to 'void => *'
        style({ height: "0", overflow: "hidden" }),
        animate(500, style({ height: "*" }))
      ]),
      transition(":leave", [
        // :leave is alias to '* => void'
        animate(500, style({ height: 0, overflow: "hidden" }))
      ])
    ]),
    trigger("fade", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 }))
      ]),
      transition(":leave", [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ManageLookupsComponent implements OnInit {
  profile: Profile = null
  picklists: Picklists = null

  nodes: TreeNode[] = []
  tree: TreeNode[] = []
  selectedNode: TreeNode = {}
  previousNode: TreeNode = null
  lookup: Lookup = null
  cols: any[]
  items: MenuItem[]
  flatTree: TreeNode[] = []   // flat list of tree nodes
  treeState: TreeNode[] = []  // tree state, list of expanded nodes

  isEditing = false

  containerDefs: ContainerModel[] = []

  displayModal: boolean
  model: any
  public isOption: boolean = false
  model2: any = {}
  def = new ContainerModel()
  changed = false
  task = 0
  isContainer = false
  volumeUnits = [0, 0]

  rotateIcon = "pi pi-angle-double-down"
  rotateText = "Expand"

  form: UntypedFormGroup

  @ViewChild(TreeTable) tt: TreeTable

  constructor(
    private pyramid: PyramidService,
    private biz: BizService,
    private store: StoreService,
    private fb: UntypedFormBuilder,
    private msg: MessageService,
    private ns: NotifyService
  ) {
  }

  async ngOnInit() {

    this.form = this.fb.group({
      group: ["", []],
      picklist: ["", []],
      option: ["", []],
      name: ["", []],
      isEnabled: [null, []],
      isItem: [null, []],
      //
      wellRows: [null, []],
      wellCols: [null, []],
      wellVolume: [null, []],
    })

    this.form.valueChanges.subscribe(val => {
      this.changed = !this.compare(this.model, val)
    })

    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => {
      if (picklists) {
        this.picklists = picklists
        this.saveState()
        this.nodes = this.gather(this.picklists.lookups)
        this.tree = [...this.nodes]
        this.flatTree = this.flatten()
        this.restoreState()
      }
    })

    this.store.profile$.pipe(untilDestroyed(this)).subscribe(profile => this.profile = profile)

    // load the container Model data
    this.containerDefs = await this.pyramid.list<ContainerModel>("ContainerModels")
  }

  get title() {
    const l = this.model._lookup
    const p = this.model._parent
    if (p || l) {
      if (!this.isOption) return `${this.group} : ${l.name}`
      return `${p.name} . ${l.name}`
    } else
      return ""
  }

  get group() {
    let l: Lookup = this.isOption ? this.model._parent : this.model._lookup
    return (l.key.includes(':')) ? l.key.split(':')[0] : ""
  }

  compare(obj1, obj2): boolean {
    let same = true
    Object.getOwnPropertyNames(obj1).filter(name => name[0] != "_").forEach(prop => {
      same &&= (JSON.stringify(obj1[prop]) === JSON.stringify(obj2[prop]))
    })
    return same
  }

  gather(rows: Lookup[], id = 0, nodes: TreeNode[] = []): TreeNode[] {
    rows
      .filter(row => row.parentId === id)
      .sort((row1, row2) => row1.key < row2.key ? -1 : 1)
      .forEach(row => {
        const tn: TreeNode = {
          data: row,
          label: row.name,
          children: [],
        }
        nodes.push(tn)
        this.gather(rows, row.id, tn.children)
      })
    return nodes
  }

  // lookup
  //----------------
  // id
  // parentId
  // key
  // name
  // isEnabled
  // isItem

  // model
  //----------------
  // id
  // group        only when parent
  // picklist     only when parent
  // option       only when no parent
  // name
  // isEnabled
  // isItem


  async lookupSelect(event) {
    if (this.selectedNode == this.previousNode) return
    if (this.isEditing && this.changed) {
      const ans = await this.ns.confirm("Discard Changes", "There are usaved changes. Do you want to continue?", { acceptText: "Yes" })
      if (!ans) {
        this.selectedNode = this.previousNode
        return
      }
    }
    this.previousNode = this.selectedNode
    this.isEditing = false
    
    // this.msg.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label })
    const lookup = event.node.data as Lookup
    const parent = this.picklists.lookupById(lookup.parentId)
    this.def = this.containerDefs.find(def => def.containerType === lookup.id)
    this.isOption = (parent != null)
    const parts = (parent?.key || lookup.key).split(":") ?? [null]
    this.model = []
    this.model = {
      _lookup: lookup,
      _parent: parent,
      group: parts.length > 1 ? parts[0] : null,
      picklist: parts[parts.length - 1],
      option: parent ? lookup.key : null,
      name: lookup.name,
      isItem: lookup.isItem,
      isEnabled: lookup.isEnabled
    }
    // container model found
    if (this.def) {
      this.model.wellRows = this.def.wellRows
      this.model.wellCols = this.def.wellCols
      this.model.wellVolume = [this.def.wellVolume, this.def.unitType]
    }

    this.lookup = lookup
    this.form.reset()
    this.form.patchValue(this.model)
    this.changed = false
  }









  info(text: string) {
    this.msg.add({ severity: "info", detail: text })
  }

  addLookup(task: number, parentId = 0) {
    this.task = task
    this.model = Object.assign(new Lookup(), {
      parentId,
      isEnabled: 1,
      isItem: 0,
      clientId: this.profile.clientId,
      changedBy: this.profile.id,
      changedOn: new Date().toISOString()
    })
    const list = this.picklists.listById(parentId)
    this.isContainer = list?.key.startsWith("Container")
    if (this.isContainer)
      this.def = new ContainerModel()
    this.displayModal = true
  }

  editLookup(task: number, node: TreeNode) {
    this.task = task
    const lookup: Lookup = node.data
    this.model = Object.assign({}, lookup)

    // populate Model
    const list = node.parent?.data
    this.isContainer = list?.key.startsWith("Container")
    if (this.isContainer) {
      const defs = this.containerDefs.find(cd => cd.containerType == lookup.id)
      this.def = Object.assign({}, defs)
      this.volumeUnits = [defs?.wellVolume, defs?.unitType]
    }

    this.displayModal = true
  }

  async deleteLookup(lookup) {
    const resp = await this.ns.confirm("Confirm Delete",
      `Are you sure you want to delete lookup ${lookup.name}?<br><br>
      This cannot be undone and any reference to options in this picklist wil be orphaned.`)
    if (resp) {
      this.biz.deleteLookup(lookup)
      this.info("Option deleted")
    }
  }

  printLabel(node) {
    this.info(`Print label for ${node.name}?`)
  }

  async submit() {
    this.displayModal = false
    const isUpdate = this.model.id

    // process the lookup
    this.model.name ||= this.model.key
    if (isUpdate) {
      await this.pyramid.put("Lookups", Lookup.clean(this.model))
    } else {
      const resp = await this.pyramid.post("Lookups", Lookup.clean(this.model))
      this.model.id = resp.id
    }

    if (this.isContainer) {
      // well volume and units are kept in a 2 element array
      this.def.wellVolume = this.volumeUnits[0]
      this.def.unitType = this.volumeUnits[1]
      if (this.def?.id) { // update
        await this.pyramid.put("ContainerModels", this.def)
      } else { // create
        this.def.containerType = this.model.id
        const resp = await this.pyramid.post("ContainerModels", this.def)
        this.def.id = resp.id
      }
      this.containerDefs = await this.pyramid.list("ContainerModels")
    }

    this.info("Lookup updated")
    this.biz.loadPicklists()
  }

  expandAll() {
    this.tree.forEach(node => {
      this.expandRecursive(node, true)
    })
  }

  collapseAll() {
    this.tree.forEach(node => {
      this.expandRecursive(node, false)
    })
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand)
      })
    }
  }

  // tree management
  // Collapsed > Custom > Expanded

  private flatten(nodes: TreeNode[] = null, list: TreeNode[] = []): TreeNode[] {
    nodes ||= this.nodes
    nodes.filter(node => node.children?.length > 0).forEach(node => {
      list.push(node)
      this.flatten(node.children, list)
    })
    return list
  }

  // callback from button that rotates through the tree states
  rotateState() {
    if (this.rotateText == "Expand") {
      this.saveState()
      this.traverse(true)
    } else if (this.rotateText == "Collapse")
      this.traverse(false)
    else
      this.restoreState()
  }

  private traverse(expand) {
    this.flatTree.forEach(node => node.expanded = expand)
    this.tree = [...this.nodes]
    this.updateRotate()
  }

  saveState() {
    this.treeState = this.flatTree.filter(node => node.children?.length > 0 && node.expanded).map(node => node.data.id)
  }

  restoreState() {
    this.flatTree.forEach(node => node.expanded = this.treeState.includes(node.data.id))
    this.tree = [...this.nodes]
    this.updateRotate()
  }

  nodeExpand(node) {
    this.updateRotate()
  }

  nodeCollapse(node) {
    this.updateRotate()
  }

  updateRotate() {
    const n = this.flatTree.filter(n => n.expanded).length
    if (n == this.flatTree.length) {
      this.rotateText = "Collapse"
      this.rotateIcon = "pi pi-angle-double-up"
    } else if (n == 0 && this.treeState.length > 0) {
      this.rotateText = "Restore"
      this.rotateIcon = "pi pi-share-alt"
    } else {
      this.rotateText = "Expand"
      this.rotateIcon = "pi pi-angle-double-down"
    }
  }

  edit = () => this.isEditing = !this.isEditing

  cancel = () => this.isEditing = false

  accept() {

  }
}
