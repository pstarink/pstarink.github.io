import { Component } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { FormBaseComponent } from './form-base.component'

@Component({
  selector: 'form-check',
  styleUrls: ['./components.scss'],
  template: `
    <p-checkbox
      [inputId]="formControlName"
      binary=false
      [falseValue]=0
      [trueValue]=1
      [label]="label"
      [disabled]="disabled"
      [(ngModel)]="_value"
      (onChange)="onChange($event.checked)"
      (blur)="onTouched()">
    </p-checkbox>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FormCheckComponent
    }
  ]
})
export class FormCheckComponent extends FormBaseComponent {
  // constructor() {
  //   super()
  // }
}
