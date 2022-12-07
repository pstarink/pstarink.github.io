import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, forwardRef, Inject, Injector, Input, OnInit } from '@angular/core'
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'
import { FormBaseComponent } from './form-base.component'
import * as dayjs from "dayjs"
import { BizService, PyramidService, StoreService } from '@services'

@Component({
  selector: "form-date",
  styleUrls: ["./components.scss"],
  template: `
    <label for="v-date">{{ label }}</label>
    <p-calendar [inputId]="formControlName" appendTo="body"
      [selectionMode]="mode==='daterange'?'range':'single'"
      [showTime]="mode==='datetime'"
      [timeOnly]="mode==='time' || mode==='duration'"
      [view]="view"
      [dateFormat]="format"
      [showSeconds]="seconds"
      [(ngModel)]="_value"
      [readonlyInput]="true"
      [showClear]="true"
      class="flex-auto"
      styleClass="w-full"
      (onClear)="this.writeValue('0:0:0');change(null)"
      (onSelect)="change(this._value)"
      (onBlur)="change(this._value);onTouched()">
    </p-calendar>`,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormDateComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormDateComponent)
    }
  ]
})
export class FormDateComponent extends FormBaseComponent implements OnInit, Validator {
  @Input() mode: "date" | "daterange" | "time" | "datetime" | "month" | "year" | "duration" = "date"
  @Input() seconds = false

  view = "date"
  format = "mm/dd/yy"

  change(value) {
    if (this.mode == "duration") {
      console.log("Change duration")
      this.onChange(value ? dayjs(value).format("HH:mm:ss") : null)
    } else if (this.mode == "daterange") {
      const resp = value?.map(dt => dt ? dayjs(dt).format("YYYY-MM-DD") : null)
      this.onChange(resp)
    } else if (this.mode == "year") {
      this.onChange(value ? dayjs(value).format("YYYY") : null)
    } else if (this.mode == "month") {
      this.onChange(value ? dayjs(value).format("YYYY-MM") : null)
    } else {
      this.onChange(value.toISOString())
    }
  }

  ngOnInit() {
    if (this.mode == "month") {
      this.view = "month"
      this.format = "M yy"
    }
    if (this.mode == "year") {
      this.view = "year"
      this.format = "yy"
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // console.log("Validate text")
    return null
  }

  // Override method writeValue
  writeValue = (tm) => {
    if (tm && this.mode == "duration") {
      const parts = tm.toString().split(':')
      this._value = dayjs().hour(parts[0]).minute(parts[1]).second(parts[2]).toDate()
    }
  }
}
