import { AfterContentInit, Component, Input, OnInit } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { FormBaseComponent } from './form-base.component'

@UntilDestroy()
@Component({
  selector: 'form-number',
  styleUrls: ['./components.scss'],
  template: `
    <label for="v-number" class="block">{{ label }}</label>
    <div class="flex">
      <span class="flex-auto">
        <p-inputNumber
          [inputId]="formControlName"
          [(ngModel)]="_value"
          [showButtons]="decimals===0 && !units"
          [class.updown]="decimals===0 && !units"
          [useGrouping]="false"
          mode="decimal"
          [maxFractionDigits]="decimals || 2"
          class="w-full mh20"
          styleClass="w-full"
          [placeholder]="prompt"
          #ctrl="ngModel"
          [showClear]="true"
          (keyup)="change($event.target.value, this._unit)"
          (onInput)="change($event.value, this._unit)"
          (onClear)="_value=null;change(null,this._unit)"
          (blur)="onTouched()">
        </p-inputNumber>
      </span>

      <ng-container *ngIf="units">
        <ng-container *ngIf="model?.length===1; else cascade">
            <p-dropdown
              [inputId]="formControlName"
              [(ngModel)]="_unit"
              [options]="model[0]?.options"
              optionLabel="name"
              optionValue="id"
              [autoDisplayFirst]="false"
              class="units"
              #ctrl="ngModel"
              placeholder="units"
              appendTo="body"
              (onChange)="change(this._value, $event.value)"
              (blur)="onTouched($event)">
            </p-dropdown>
        </ng-container>
        <ng-template #cascade>
            <p-cascadeSelect
              inputId="v-cascade"
              [(ngModel)]="_unit"
              [options]="model"
              optionLabel="name"
              optionValue="id"
              optionGroupLabel="name"
              [optionGroupChildren]="['options']"
              #ctrl="ngModel"
              class="units"
              placeholder="units"
              appendTo="body"
              (onChange)="change(this._value, $event.value)"
              (blur)="onTouched($event)">
            </p-cascadeSelect>
        </ng-template>
      </ng-container>
    </div>
    <!-- <small *ngIf="prompt" id="v-number-help">{{ prompt }}</small> -->`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FormNumberComponent
    }
  ]
})
export class FormNumberComponent extends FormBaseComponent implements OnInit {
  @Input() decimals = 0
  @Input() units
  private model = null

  // units = "Units:Volume.uL"
  // [default]="[222,502]"
  // control: [[333,503],[]]
  // patchValue( control, [444,504])
  ngOnInit() {
    this.decimals ||= 0

    // initialize simple numbers
    if (!this.units && this.default) this.change(this.default)

    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(async picklists => {
      const pl = picklists || this.biz.picklists
      if (pl && this.units) {
        this.model = picklists.listsBySpec(this.units)
        if (this.units) {
          const pick = picklists.selectionBySpec(this.units)
          if (pick) this._unit = pick?.id
        }
        if (Array.isArray(this.default) && this.default.length == 2) {
          this._value = this.default[0]
          this._unit = this.default[1]
        }
        this.change(this._value, this._unit)
      }
    })
  }

  writeValue = async (value: any) => {
    if (!value) return
    if (Array.isArray(value) && value.length == 2)
      this.change(value[0], value[1])
    else
      this.change(value)
  }

  async change(value: string, unit: string | number = 0) {
    await this.sleepUntil(() => this.onChange)
    this._value = value // parseFloat(value)
    if (this.model) this._unit = + unit
    const resp = this.model ? [this._value, this._unit] : this._value
    console.log("change", resp)
    this.onChange(resp)
  }

}
