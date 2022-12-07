import { Component, OnInit } from '@angular/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { PyramidService } from '@services'
import { Picklists, Profile } from '@shared/models'
import { User } from "@shared/entities"
import { NotifyService } from '@components'
import { MessageService } from 'primeng/api'
import { StoreService } from '@app/services/store.service'
import * as _ from "lodash"
import { json } from "@shared"

@UntilDestroy()
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  providers: [MessageService]
})
export class UsersComponent implements OnInit {

  profile: Profile
  picklists: Picklists

  cols = []
  rows = []
  displayModal = false
  model: User

  EDIT = 1
  CREATE = 2
  task = this.EDIT

  constructor(
    private pyramid: PyramidService,
    private store: StoreService,
    private msg: MessageService,
    private ns: NotifyService
  ) {
  }

  async ngOnInit() {
    this.store.profile$.pipe(untilDestroyed(this)).subscribe(profile => this.profile = profile)
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => this.picklists = picklists);
    this.store.users$.pipe(untilDestroyed(this)).subscribe(users => this.rows = _.sortBy(users, "name"))
    // this.rows = await this.pyramid.list("Users")
    // this.clients = await this.pyramid.list("Clients")

    this.cols = [
      { type: "icon", field: "icon_edit", icon: "edit", wd: 30, click: (action: string, row: any) => this.onEdit(row) },
      //
      { field: "name", header: "Name" },
      { field: "roleType", header: "Role", render: row => this.picklists.name[row.roleType] },
      //
      { type: "icon", field: "icon_delete", icon: "delete", wd: 30, click: (action: string, row: any) => this.onDelete(row) },
    ]
  }

  async refresh() {
    const rows = await this.pyramid.list("Users")
    this.rows = _.sortBy(rows, "name")
  }

  async onEdit(row) {
    json(row)
    this.model = Object.assign({}, row);
    this.task = this.EDIT;
    this.displayModal = true;
  }

  async onDelete(row) {
    const resp = await this.ns.confirm("Delete User", `Are you sure you want to delete user ${row.name}?`)
    if (resp) {
      await this.pyramid.delete(`users/${row.id}`)
      this.msg.add({ severity: "info", detail: "User deleted" })
      this.refresh()
    }
  }

  async addUser() {
    this.model = new User()
    this.task = this.CREATE
    this.displayModal = true
  }

  async submit() {
    this.displayModal = false;
    this.model.updatedBy = this.profile.id
    this.model.updatedOn = new Date().toISOString()
    if (this.task == this.EDIT) {
      await this.pyramid.put("users", this.model)
      this.msg.add({ severity: "info", detail: "User updated" })
    } else {
      await this.pyramid.post("users", this.model)
      this.msg.add({ severity: "info", detail: "User created" })
    }
    this.refresh()
  }
}
