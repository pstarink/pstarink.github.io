import { AfterContentInit, AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Lookup } from '@shared/entities'
import { Picklists } from '@shared/models'
import { FormBaseComponent } from './form-base.component'

@UntilDestroy()
@Component({
  selector: 'form-select',
  styleUrls: ['./components.scss'],
  template: `
    <ng-container *ngIf="multi; else single">
      <span *ngIf="model">
        <label for="v-multi">{{ label || model?.name }}</label>
        <p-multiSelect
          [inputId]="formControlName"
          [(ngModel)]="_value"
          [options]="model[0].options"
          optionLabel="name"
          optionValue="id"
          display="chip"
          styleClass="w-full"
          [showHeader]="false"
          [showClear]="true"
          appendTo="body"
          (onChange)="onChange($event.value)"
          (onClear)="this._value=null;onChange(null)"
          (blur)="onTouched()">
        </p-multiSelect>
      </span>
    </ng-container>
    <ng-template #single>
      <ng-container *ngIf="model?.length===1; else cascade">
        <label for="v-picklist">{{ label || model[0]?.name }}</label>
        <p-dropdown
          [inputId]="formControlName"
          [(ngModel)]="_value"
          [options]="model[0]?.options"
          optionLabel="name"
          optionValue="id"
          [autoDisplayFirst]="false"
          [showClear]="true"
          appendTo="body"
          class="w-full"
          styleClass="w-full"
          (onChange)="onChange($event.value)"
          (onClear)="this._value=null;onChange(null)"
          (blur)="onTouched()">
        </p-dropdown>
      </ng-container>
      <ng-template #cascade>
        <label for="v-cascade">{{ label }}</label>
        <span *ngIf="model">
          <p-cascadeSelect
            [inputId]="formControlName"
            [(ngModel)]="_value"
            [options]="model"
            optionLabel="name"
            optionValue="id"
            optionGroupLabel="name"
            [optionGroupChildren]="['options']"
            [placeholder]="prompt"
            appendTo="body"
            [showClear]="true"
            class="w-full"
            styleClass="w-full"
            (onChange)="onChange($event.value)"
            (onClear)="this._value=null;onChange(null)"
            (blur)="onTouched()">
          </p-cascadeSelect>
        </span>
      </ng-template>
    </ng-template>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FormSelectComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormSelectComponent)
    }
  ]
})
export class FormSelectComponent extends FormBaseComponent implements OnInit, Validator {
  @Input() picklist: string
  @Input() options: any = null
  @Input() multi = false

  model: Lookup[] | { name: string, id: any }[] | any = null

  ngOnInit(): void {
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => {
      if (picklists && (this.picklist || this.options)) {
        this.model = this.options ? [{ options: this.options }] : this.picklists.listsBySpec(this.picklist)
        const selection = this.picklists.selectionBySpec(this.picklist)
        if (selection) this._value = selection.id
        if (this.default) this._value = this.default
        this.sleepUntil(() => this.onChange)
          .then(() => this.onChange(this._value))
      }
    })
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // console.log(`Validate select: ${control.value}`)
    return null
  }
}
