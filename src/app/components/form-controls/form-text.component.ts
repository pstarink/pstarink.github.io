import { AfterContentInit, Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { FormBaseComponent } from './form-base.component';

@Component({
  selector: "form-text",
  styleUrls: ["./components.scss"],
  template: `
    <ng-container *ngIf="rows === 1; else area">
      <label for="form-text">{{ label }}</label>
      <span class="flex" [class.p-input-icon-left]="icon">
        <i *ngIf="icon" class="pi pi-{{icon}}"></i>
        <input pInputText
          inputId="form-text"
          type="text"
          [(ngModel)]="_value"
          [placeholder]="prompt ?? ''"
          [disabled]="disabled"
          #ctrl="ngModel"
          class="flex-auto w-full"
          (keyup)="onChange($event.target.value)"
          (blur)="onTouched()">
      </span>
    </ng-container>
    <ng-template #area>
      <label for="form-textarea">{{ label }}</label>
      <textarea pInputTextarea
        inputId="form-textarea"
        [rows]="rows"
        [placeholder]="prompt ?? ''"
        style="min-width:100%;max-width:100%"
        #ctrl="ngModel"
        [(ngModel)]="_value"
        class="flex-auto"
        (keyup)="onChange($event.target.value)"
        (blur)="onTouched()">
      </textarea>
    </ng-template>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormTextComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormTextComponent)
    }
  ]
})
export class FormTextComponent extends FormBaseComponent implements Validator {
  @Input() rows = 1

  validate(control: AbstractControl): ValidationErrors | null {
    // console.log("Validate text")
    return null
  }
}
