import { CommonModule } from '@angular/common'
import { Component, Input, NgModule, OnInit } from '@angular/core'
import { StoreService } from '@services'
import { PrimeModule } from '@app/prime.module'


@Component({
  selector: 'control-errors',
  template: `
    <div class="text-sm text-teal-500">{{ getErrors() }}</div>
`
})
export class ControlErrorsComponent {
  @Input() form
  @Input() name

  constructor(
    private store: StoreService
  ) {
  }

  getErrors() {
    const errors = this.form?.get(this.name)?.errors
    return errors ? JSON.stringify(errors, null, " ") : null
  }
}

@NgModule({
  imports: [
    CommonModule,
    PrimeModule
  ],
  declarations: [ControlErrorsComponent],
  exports: [ControlErrorsComponent],
})
export class ControlErrorsModule { }
