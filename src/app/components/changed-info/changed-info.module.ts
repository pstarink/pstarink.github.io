import { CommonModule } from '@angular/common'
import { Component, Input, NgModule, OnInit } from '@angular/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { StoreService } from '@services'
import { User } from '@shared/entities'
import { PrimeModule } from '@app/prime.module'
import * as dayjs from "dayjs"


@UntilDestroy()
@Component({
  selector: 'changed-info',
  template: `
    <div class="my-1" class="text-tan-500">
      <span>{{ date }}</span>
      <span *ngIf="user"> by <span class="text-tan-700">{{ user.name }}</span></span>
    </div>
`
})
export class ChangedInfoComponent implements OnInit {
  @Input() model

  user: User
  users: User[]

  constructor(
    private store: StoreService
  ) {
    store.users$.pipe(untilDestroyed(this)).subscribe(users => {
      this.users = users
    })
  }

  ngOnInit(): void {
    this.user = this.users?.find(user => user.id === this.model?.updatedBy)
  }

  get date() {
    const dt = dayjs(this.model.updatedOn)
    const date = dt.format("YYYY/MM/DD")
    const time = dt.format("HH:mm")
    if (!this.model?.updatedOn) {
      return "No updated date"
    }
    return `Last updated on ${date} at ${time}`
  }
}

@NgModule({
  imports: [
    CommonModule,
    PrimeModule
  ],
  declarations: [ChangedInfoComponent],
  exports: [ChangedInfoComponent],
})
export class ChangedInfoModule { }
