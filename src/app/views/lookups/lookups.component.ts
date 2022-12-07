import { Component, OnInit, ViewChild } from '@angular/core'
import { MenuItem, MessageService, TreeNode } from 'primeng/api'
import { BreadcrumbService } from '../../services/app.breadcrumb.service'
import { ContainerModel, Lookup } from '@shared/entities'
import { Picklists, Profile } from '@shared/models'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { BizService, PyramidService } from '@services'
import { TreeTable } from 'primeng/treetable'
import { NotifyService } from '@app/components'
import { StoreService } from '@app/services/store.service'

@UntilDestroy()
@Component({
  selector: 'lookups',
  templateUrl: './lookups.component.html',
  styleUrls: ['./lookups.component.scss'],
  providers: [MessageService]
})
export class LookupsComponent implements OnInit {
  profile: Profile = null
  picklists: Picklists = null

  nodes: TreeNode[] = []
  tree: TreeNode[] = []
  selectedNode: TreeNode = {}
  cols: any[]
  items: MenuItem[]
  flatTree: TreeNode[] = []   // flat list of tree nodes
  treeState: TreeNode[] = []  // tree state, list of expanded nodes

  containerDefs: ContainerModel[] = []

  displayModal: boolean
  model: Lookup
  def = new ContainerModel()
  task = 0
  isContainer = false
  volumeUnits = [0, 0]

  rotateIcon = "pi pi-angle-double-down"
  rotateText = "Expand"

  @ViewChild(TreeTable) tt: TreeTable

  constructor(
    // private breadcrumbService: BreadcrumbService,
    private pyramid: PyramidService,
    private biz: BizService,
    private store: StoreService,
    private msg: MessageService,
    private ns: NotifyService
  ) {
    // this.breadcrumbService.setItems([
    //   { label: 'Lookups' }
    // ])
  }

  async ngOnInit() {
    // id, parentId, key, name, roleType, externalRef, isItem, isEnabled, clientId, changedBy, changedOn
    this.cols = [
      { field: "key", header: "Key" },
      { field: "id", header: "Id", wd: 75 },
      { field: "name", header: "Name" },
      { field: "isItem", header: "Item", wd: 75 },
      { field: "isEnabled", header: "Enabled", wd: 75 },
      { field: "roleType", header: "Role", wd: 100 },
    ]

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
    this.containerDefs = await this.pyramid.list("ContainerModels")
  }

  taskText() {
    if (this.task == 1) return "Add Picklist"
    if (this.task == 2) return `Add Option to PickList ${this.selectedNode?.data.name} (${this.selectedNode?.data?.id})`
    if (this.task == 3) return `Edit Picklist (${this.model?.id})`
    if (this.task == 4) return `Edit Option (${this.model?.id})`
    return "Picklists & Options"
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

  info(text: string) {
    this.msg.add({ severity: "info", detail: text })
  }

  setContextMenu(node: TreeNode) {
    if (this.tree.includes(node)) {
      // lists
      this.items = [
        { label: 'Edit', icon: 'pi pi-pencil', command: (event) => this.editLookup(3, this.selectedNode) },
        { label: 'Delete', icon: 'pi pi-trash', command: (event) => this.deleteLookup(this.selectedNode.data) },
        { label: 'Add Option', icon: 'pi pi-plus-circle', command: (event) => this.addLookup(2, this.selectedNode.data.id) },
      ]
    } else {
      // options
      this.items = [
        { label: 'Edit', icon: 'pi pi-pencil', command: (event) => this.editLookup(4, this.selectedNode) },
        { label: 'Delete', icon: 'pi pi-trash', command: (event) => this.deleteLookup(this.selectedNode.data) },
        { label: 'Print Label', icon: 'pi pi-print', command: (event) => this.printLabel(this.selectedNode.data) }
      ]
    }
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

  nodeSelect(node) {
    // this.lookupModel = { ...node }
    this.displayModal = true
    alert('SELECT')
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
}
