import { Component, OnInit, ViewChild } from '@angular/core'
import { MenuItem, MessageService, TreeNode } from 'primeng/api'
import { ContainerModel, Lookup, Location, LocationModel } from '@shared/entities'
import { Picklists, Profile } from '@shared/models'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { BizService, PyramidService } from '@services'
import { TreeTable } from 'primeng/treetable'
import { NotifyService } from '@app/components'
import { StoreService } from '@app/services/store.service'
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { scaleInOutAnimation } from '@app/animations'
import { BehaviorSubject } from 'rxjs'
import { NGXLogger } from 'ngx-logger'

@UntilDestroy()
@Component({
  selector: 'manage-storage',
  templateUrl: './manage-storage.component.html',
  styleUrls: ['./manage-storage.component.scss'],
  providers: [MessageService],
  animations: []
})
export class ManageStorageComponent implements OnInit {
  readonly EDIT_LOCATION = 1
  readonly ADD_LOCATION = 2

  profile: Profile = null
  picklists: Picklists = null
  n = 1
  positions = []

  nodes: TreeNode[] = []
  tree: TreeNode[] = []
  selectedNode: TreeNode = {}
  location: Location = null
  parent: Location = null
  locationModel: LocationModel = null
  cols: any[]
  items: MenuItem[]
  flatTree: TreeNode[] = []   // flat list of tree nodes
  treeState: string[] = []  // tree state, list of expanded nodes
  selectedBc: string
  containerDefs: ContainerModel[] = []
  parentModel: LocationModel = null

  holderRows = []
  holderCols = []

  displayModal: boolean
  model: any
  public isOption: boolean = false
  def = new ContainerModel()
  changed = false
  task = 0
  isHolder = false
  isContainer = false
  volumeUnits = [0, 0]
  models: LocationModel[]

  colIndex: string[] = []
  rowIndex: string[] = []

  rotateIcon = "pi pi-angle-double-down"
  rotateText = "Expand"

  locations$: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>(null)
  locations: Location[] = []
  modelOptions = []

  view: string = "storage"
  first = true

  form: UntypedFormGroup

  @ViewChild(TreeTable) tt: TreeTable

  constructor(
    private pyramid: PyramidService,
    private biz: BizService,
    private store: StoreService,
    private fb: UntypedFormBuilder,
    private msg: MessageService,
    private ns: NotifyService,
    private log: NGXLogger
  ) {
  }

  async ngOnInit() {

    this.items = [
      {
        label: 'Holders',
        icon: 'pi pi-pw pi-file',
        command: event => this.menuClick("holders")
      },
      {
        label: 'Objects',
        icon: 'pi pi-fw pi-pencil',
        command: event => this.menuClick("objects")
      }
    ]

    this.form = this.fb.group({
      id: [null, []],
      locationModelId: [0, []],
      name: ["", []],
      position: ["", []],
      layout: ["", []],
      isFixed: [1, []],
      isEnabled: [1, []]
    })

    this.form.valueChanges.subscribe(val => {
      this.changed = !this.compare(this.model, val)
    })

    this.locations$.pipe(untilDestroyed(this)).subscribe((locations: Location[]) => {
      if (locations?.length > 0) {
        this.locations = locations
        this.saveState()
        this.tree = this.gather(locations)
        this.flatTree = this.flatten(this.tree)
        this.restoreState()
        if (this.first) {
          this.first = false
          this.level2()
        }
      }
    })

    const requests = [
      this.pyramid.list("Locations"),
      this.pyramid.list("LocationModels"),
    ]
    const [locations, models] = await Promise.all(requests)
    this.models = models as LocationModel[]
    this.modelOptions = this.models.filter(model => model.isFixed).map(model => ({ id: model.id, name: model.name }))
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => this.picklists = picklists)
    this.store.profile$.pipe(untilDestroyed(this)).subscribe(profile => this.profile = profile)
    this.locations$.next(locations as Location[])
  }

  refreshStorage = async () => this.pyramid.list<Location>("Locations").then(locations => this.locations$.next(locations))

  menuClick(cmd) {
    this.selectedNode = null
    this.view = cmd
  }

  get typeName(): string {
    return this.locationModel?.name || "-"
  }

  compare(obj1, obj2): boolean {
    let same = true
    Object.getOwnPropertyNames(obj1).filter(name => name[0] != "_").forEach(prop => {
      same &&= (JSON.stringify(obj1[prop]) === JSON.stringify(obj2[prop]))
    })
    return same
  }

  // Create a tree representation of nodes from the list of locations
  gather(rows: Location[], id = 0, nodes: TreeNode[] = []) {
    rows
      .filter(row => row.parentId === id)
      .sort((row1, row2) => +row1.position < +row2.position ? -1 : 1)
      .forEach(row => {
        const tn: TreeNode = {
          data: row,
          key: row.barcode,
          label: row.name,
          children: [],
          type: "btn"
        }
        nodes.push(tn)
        this.gather(rows, row.id, tn.children)
      })
    return nodes
  }


  async selectNode(node) {
    if (node) {
      this.view = "storage"
      // this.msg.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label })
      this.location = node.data as Location
      this.parent = this.location
      this.parentModel = this.models.find(model => model.id == this.parent?.locationModelId)
      this.locationModel = this.models.find(model => model.id == this.location.locationModelId)

      // draw a holder
      if (!this.location.isFixed) {
        this.isHolder = true
        this.isContainer = true
        this.n = 5
        const dims = this.location.layout.split("x")
        this.colIndex = [""]
        this.rowIndex = Array.from(Array(dims[0])).map((e, i) => String.fromCharCode(i + 65));
        if (dims.length == 1) {
          this.holderRows = [...Array(+dims[0]).keys()]
          this.holderCols = [ 1 ]
        } else if (dims.length == 2) {
          this.colIndex = Array.from(Array(dims[1])).map((e, i) => (i + 1).toString())
          this.colIndex = [...Array(+dims[1])].map((e, i) => (i + 1).toString());
          console.log(this.colIndex)
          this.holderRows = [...Array(+dims[0]).keys()]
          this.holderCols = [...Array(+dims[1]).keys()]
        }

        this.positions = []
        this.n = this.holderCols.length
        for (let row of this.holderRows) {
          for (let col of this.holderCols) {
            this.positions.push({
              row,
              col
            })
          }
        }
      }
    }
  }

  get styleCols(): string {
    return `repeat(${this.holderCols},minmax(20px,50px))`
  }

  info(text: string) {
    this.msg.add({ severity: "info", detail: text })
  }

  taskText() {
    const barcode = this.location?.barcode ? ` (${this.location.barcode})` : ""
    if (this.task == 1) return `Edit Location '${this.location?.name}'${barcode}`
    if (this.task == 2) return "Add Location"
    return "Location"
  }

  addNode(node) {
    this.task = 1
    console.log(`Adding node to ${node.data.name}`)
    const parent: Location = node.data as Location
    this.model = Object.assign(new Location(), {
      parentId: parent.id,
      locationModelId: 0,
      key: "",
      name: "",
      layout: "",
      isFixed: true,
      isEnabled: true
    })
    this.displayModal = true
  }

  addLocation(task: number, parent: Location) {
    this.task = task
    this.model = {
      id: null,
      locationModelId: null,
      name: null,
      position: null,
      layout: null,
      isFixed: 1,
      isEnabled: 1
    }

    this.form.reset()
    this.form.patchValue(this.model)
    this.changed = false
    this.displayModal = true
  }

  editLocation(task: number, location: Location) {
    this.task = task
    this.model = {
      id: location.id,
      locationModelId: location.locationModelId,
      name: location.name,
      position: location.position,
      layout: location.layout,
      isFixed: location.isFixed,
      isEnabled: location.isEnabled
    }

    this.form.reset()
    this.form.patchValue(this.model)
    this.changed = false
    this.displayModal = true
  }

  async deleteLocation(location) {
    try {
      await this.biz.deleteLocation(location)
    } catch {
      this.ns.alert("Error", "Unable to delete the location")
    }
    // const resp = await this.ns.confirm("Confirm Delete",
    //   `Are you sure you want to delete location ${location.key}?<br><br>
    //   This will delete all child locations and check out all holders, container and objects.`)
    // if (resp) {
    //   this.info("Option deleted")
    // }
  }

  printLabel(node) {
    this.info(`Print label for ${node.name}?`)
  }

  async submit() {
    this.displayModal = false
    const data = Location.clean(this.form.value)
    console.log("data", data)
    if (this.task == this.EDIT_LOCATION) {
      await this.pyramid.put("crud/Locations", data)
    } else {
      data.parentId = this.selectedNode.data.id
      data.barcode = await this.biz.reserveBarcode()
      alert(data.barcode)
      const resp = await this.pyramid.post("crud/Locations", data)
      this.model.id = resp.id
    }
    this.refreshStorage()
  }

  // tree management

  level2() {
    this.flatTree.forEach(node => node.expanded = false)
    this.tree.forEach(node => node.expanded = true)
    // this.tree = [...this.nodes]
    this.updateRotate()
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

  // flatten a tree into a list of nodes
  private flatten(nodes: TreeNode[] = null, list: TreeNode[] = []): TreeNode[] {
    for (let node of nodes) {
      // nodes.filter(node => node.children?.length >= 0).forEach(node => {
      list.push(node)
      this.flatten(node.children, list)
    }
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
    console.log("*traverse")
    this.flatTree.forEach(node => node.expanded = expand)
    // this.tree = [...this.nodes]
    this.updateRotate()
  }

  saveState() {
    this.treeState = this.flatTree.filter(node => node.children?.length > 0 && node.expanded).map(node => node.key)
    this.selectedBc = this.selectedNode?.key
  }

  restoreState() {
    this.flatTree.forEach(node => node.expanded = this.treeState.includes(node.key))
    // this.tree = [...this.nodes]
    this.selectedNode = this.findNode(this.selectedBc, this.tree)
    this.selectNode(this.selectedNode)
    this.updateRotate()
  }

  findNode(barcode: string, nodes: TreeNode[]): TreeNode | undefined {
    for (let node of nodes) {
      if (node.key === barcode) return node
      if (node.children) {
        let matchedNode = this.findNode(barcode, node.children)
        if (matchedNode) return matchedNode
      }
    }
    return undefined
  }

  nodeExpand() {
    this.updateRotate()
  }

  nodeCollapse() {
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
