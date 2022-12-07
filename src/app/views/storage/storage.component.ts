import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { Picklists, Profile } from '@shared/models';
import { Location } from "@shared/entities"
import { BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PyramidService } from '@services';
import { TreeTable } from 'primeng/treetable';
import { NotifyService } from "@app/components"
import * as _ from "lodash";
import { StoreService } from '@app/services/store.service';

@UntilDestroy()
@Component({
  selector: 'storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
  providers: [MessageService]
})
export class StorageComponent implements OnInit {

  profile: Profile = null
  picklists: Picklists
  locations$: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>(null)

  locations: Location[] = []
  nodes: TreeNode[] = []
  tree: TreeNode[] = []
  selectedNode: TreeNode
  cols: any[]
  items = []
  flatTree: TreeNode[] = []   // flat list of tree nodes
  treeState: TreeNode[] = []  // tree state, list of expanded nodes

  displayModal: boolean
  model: Location
  task = 0
  scoped = false

  rotateIcon = "pi pi-angle-double-down"
  rotateText = "Expand"


  @ViewChild(TreeTable) tt: TreeTable;

  constructor(
    private pyramid: PyramidService,
    private store: StoreService,
    private msg: MessageService,
    private ns: NotifyService
  ) {
  }

  ngOnInit() {
    this.cols = [
      { field: "name", header: "Location" },
      { field: "locationType", header: "Type" },
      { field: "description", header: "Description" },
      { field: "barcode", header: "Barcode" },
      { field: "layout", header: "Layout" },
      { field: "isFixed", header: "Fixed" },
      { field: "isEnabled", header: "Enabled" },
      { field: "noteId", header: "Notes" }
    ];

    this.locations$.pipe(untilDestroyed(this)).subscribe(locations => {
      if (locations) {
        this.locations = locations
        this.saveState()
        this.nodes = this.gather(locations);
        this.tree = [...this.nodes]
        this.flatTree = this.flatten()
        this.restoreState()
      }
    })

    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => this.picklists = picklists);

    this.store.profile$.pipe(untilDestroyed(this)).subscribe(profile => this.profile = profile);

    this.refreshStorage();
  }

  async refreshStorage() {
    const locations = await this.pyramid.list<Location>("Locations")
    if (locations) {
      this.locations$.next(locations)
    }
  }

  taskText() {
    if (this.task == 1) return `Add Top Level Location`
    if (this.task == 2) return `Add Location (${this.selectedNode?.data?.barcode})`
    if (this.task == 3) return `Edit Location (${this.model?.barcode})`
    return "Locations"
  }

  gather(rows: Location[], id = 0, nodes: TreeNode[] = []) {
    rows
      .filter(row => row.parentId === id)
      .sort((row1, row2) => row1.name < row2.name ? -1 : 1)
      .forEach(row => {
        const tn: TreeNode = {
          data: row,
          label: row.name,
          children: [],
        }
        nodes.push(tn);
        this.gather(rows, row.id, tn.children)
      });
    return nodes
  }

  info(text: string) {
    this.msg.add({ severity: "info", summary: "Node Selected", detail: text });
  }

  level2() {
    this.flatTree.forEach(node => node.expanded = false)
    this.nodes.forEach(node => node.expanded = true)
    this.tree = [...this.nodes]
    this.updateRotate()
  }

  scope(node) {
    this.tree = [node];
  }

  unScope() {
    this.tree = [...this.nodes]
  }

  setContextMenu(node: TreeNode) {
    this.items = [
      { label: 'Edit', icon: 'pi pi-pencil', command: (event) => this.editLocation(this.selectedNode) },
      { label: 'Delete', icon: 'pi pi-trash', command: (event) => this.deleteLocation(this.selectedNode) },
      { label: 'Add Location', icon: 'pi pi-plus-circle', command: (event) => this.addLocation(2, this.selectedNode.data.id) },
      { label: 'Print Label', icon: 'pi pi-qrcode', command: (event) => this.printLabel(this.selectedNode) }
    ];
  }

  // id, parentId, barcode, name, externalId, description, locationType, position, layout, isFixed, isEnabled, noteId, clientId, changedBy, changedOn
  addLocation(task: number, parentId = 0) {
    this.task = task;
    this.model = Object.assign(new Location(), {
      parentId,
      isFixed: 1,
      isEnabled: 1,
      clientId: this.profile.clientId,
      changedBy: this.profile.id,
      changedOn: new Date().toISOString()
    });
    this.displayModal = true;
  }

  editLocation(node: TreeNode) {
    this.task = 3;
    this.model = Object.assign({}, node.data);
    this.displayModal = true;
  }

  async deleteLocation(node: TreeNode) {
    const location: Location = node.data;
    const resp = await this.ns.confirm("Confirm Delete",
      `Are you sure you want to delete storage location ${location.name}?<br><br>
      All contained locations will also be deleted, and all containers<br/>
      held in these locations will be checked out.<br><br>
      This cannot be undone`)
    if (resp) {
      // await this.biz.deleteLocation(location)
      this.info("Location deleted")
    }
  }

  printLabel(node) {
    this.info(`Print label for ${node.name}?`)
  }

  async submit() {
    this.displayModal = false
    if (this.model.id) {
      await this.pyramid.put("Locations", this.model)
    } else {
      const resp = await this.pyramid.post("Locations", this.model)
      this.model.id = resp.id
    }
    this.refreshStorage()
    this.info("Location updated")
  }

  editNotes(node: TreeNode) {
    this.ns.confirm("Notes", "Edit note for location " + node.data.name)
  }

  // tree management
  // Collapsed > Custom > Expanded

  private flatten(nodes: TreeNode[] = null, list: TreeNode[] = []): TreeNode[] {
    nodes ??= this.nodes
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
