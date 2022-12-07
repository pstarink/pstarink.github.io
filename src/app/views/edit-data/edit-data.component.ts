import { Component, OnInit } from "@angular/core"
import { User } from "@shared/entities"
import { Picklists } from "@shared/models"
import { BroadcastService, PyramidService, StoreService } from "@app/services"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { SelectionChange } from "@angular/cdk/collections"
import { BehaviorSubject } from "rxjs"
import { DynamicFormControl, NotifyService } from "@components"
import * as _ from "lodash"
import { UntypedFormGroup } from "@angular/forms"
import { paint } from "@app/shared"
import { MessageService } from "primeng/api"

@UntilDestroy()
@Component({
  selector: "edit-data",
  templateUrl: "./edit-data.component.html",
  styleUrls: ["./edit-data.component.scss"],
  providers: [MessageService]
})
export class EditDataComponent implements OnInit {

  tables$ = new BehaviorSubject<string[]>([]);
  table = "";
  tables = [];
  tableName = "";

  paint = paint

  picklists: Picklists;

  colNames = []
  cols = []
  rows = []
  clients = []
  users = []
  config: DynamicFormControl[] = []
  form = new UntypedFormGroup({})
  model: any = {}

  displayModal = false

  constructor(
    private pyramid: PyramidService,
    private ns: NotifyService,
    private store: StoreService,

    private broadcast: BroadcastService
  ) {
  }

  ngOnInit(): void {
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => this.picklists = picklists);
    this.tables$.pipe(untilDestroyed(this)).subscribe(tables => this.tables = tables.map(table => ({ name: table, value: table })));
    this.store.users$.pipe(untilDestroyed(this)).subscribe(users => this.users = users)

    this.broadcast.listen("fk").subscribe((val) => {
      console.log(`Selected row id = ${val}`)
    })

    this.refresh();
  }

  async refresh() {
    this.clients = await this.pyramid.list("Clients");
    // this.users = await this.pyramid.list("Users");
    const tables = await this.pyramid.tables();
    this.tables$.next(tables);
  }

  async selectTable(item) {
    this.tableName = item.name;
    this.colNames = await this.pyramid.tableColumns(item.name);
    console.log(this.colNames);
    this.cols = [
      { type: "icon", field: "icon_edit", icon: "edit", wd: 50, click: (action: string, row: any) => this.onAction(action, row) },
      ...this.colNames.map(col => ({ field: col, header: col })),
      { type: "icon", field: "icon_delete", icon: "delete", wd: 50, click: (action: string, row: any) => this.onAction(action, row) },
    ];
    // set some widths
    this.cols.forEach(col => {
      if (col.field == "id") col.wd = 75
      if (col.field == "changedBy") col.wd = 100
    })
    // this.fields = this.createFields();
    // this.ns.showJson("Formly Fields", JSON.stringify(this.fields, null, 2))
    this.rows = await this.pyramid.list(item.name);
  }

  onClick(event, row, col) {
    console.log(`PARENT CLICK: ${col.property}`);
  }

  onRowClick(row) {
    console.log("CLICK: " + row.id)
  }

  async onAction(action: string, row) {
    if (action === "edit") {
      this.model = Object.assign({}, row)
      const response = await this.ns.formly(`Edit ${this.tableName} Record`, null, this.model) //, this.fields);
      if (response) {
        this.ns.showJson("Row", response);
        // Object.assign(row, response);
        // this.pyramid.put(this.tableName, row);
      }
    } else if (action === "delete") {
      const resp = await this.ns.confirm("Delete Row", `Do you really want to delete row ${row.id}?`);
      if (resp) {
        await this.ns.message("Row deleted");
      }
    }
  }

  async submit() {
    this.ns.showJson("Row", this.model);
    // Object.assign(this.row, response);
    // this.pyramid.put(this.tableName, row);
  }

  clientByUser(user: User) {
    return this.clients.find(client => client.id == user.id)?.name ?? "-";
  }

  onSelect(model: SelectionChange<any>) {
    console.log(`PARENT SELECT: ++${model.added.length} --${model.removed.length}`);
  }

  onRowClicked(event) {
    console.log(`PARENT ROW: ${event.text}`);
  }

  onProcess(action) {
    console.log(`Process ${action}`);
  }

  async addRecord() {
    this.model = {};
    const response = await this.ns.formly(`New ${this.tableName} Record`, null, this.model, this.config);
    if (response) {
      this.ns.showJson("Row", response);
      const resp: any = this.pyramid.post(this.tableName, response);
      this.model.id = resp.id;
      this.rows = [...this.rows, response];
    }
  }

  showJson(json) {
    return JSON.stringify(json, null, 2)
  }
}
