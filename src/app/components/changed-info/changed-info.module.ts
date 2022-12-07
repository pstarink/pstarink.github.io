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
    <div class="mx-3 my-1 text-purple-400">
      {{ info() }}
    </div>
`
})
export class ChangedInfoComponent {
  @Input() model

  users: User[]

  constructor(
    private store: StoreService
  ) {
    store.users$.pipe(untilDestroyed(this)).subscribe(users => this.users = users)
  }

  info() {
    let msg: string = ""
    const dt = dayjs().format("YYYY/MM/DD")
    const tm = dayjs().format("HH:mm")
    if (!this.model) {
      msg += "No information available"
    } else if (!this.model.changedOn) {
      msg += "No changed date"
    }
    msg = `Last changed on ${dt} at ${tm} by ${this.getUser()}`
    return msg
  }

  getUser(id: number = 0) {
    const user = this.users?.find(user => user.id === this.model?.changedBy)
    return user?.name ?? "n/a"
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
