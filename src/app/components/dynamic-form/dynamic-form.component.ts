import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormControl, FormControl, SelectControlValueAccessor } from '@angular/forms';
import { DynamicFormControl } from './dynamic-form.model'
import { paint } from '@app/shared'
import { PyramidService } from '@services';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from "lodash"
import { NGXLogger } from 'ngx-logger';
import { json } from "@shared"

/*
select:
  Lookup[Lookup[]]  > cascade
  Lookup[Lookup]    > dropdown
  Lookup[]          > cascade
*/

@Component({
  selector: 'dynamic-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnChanges {
  @Input() controls: DynamicFormControl[]
  @Input() model: any = {}
  @Output() formValid = new EventEmitter<boolean>()

  paint = paint

  cols: any[] = []
  value: any[] = []
  browse = false;
  tableName: string
  fk: string = null

  public dynForm: FormGroup = this.fb.group({});

  constructor(
    private pyramid: PyramidService,
    public sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private log: NGXLogger) {
    log.trace("*DynamicFormComponent")
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.controls?.firstChange) {
      this.log.debug(`controls changed: ${this.controls.length} controls`)
      this.controls = changes.controls.currentValue?.map(c => new DynamicFormControl(c))
      this.createForm(this.controls)
      this.formValid.emit(this.dynForm.valid)
    }
    if (changes?.model?.firstChange) {
      this.setValues(changes.model.currentValue)
    }
  }

  createForm(controls: DynamicFormControl[] = []) {
    for (const control of controls) {
      // create array of Validators
      const validatorsToAdd = []
      for (const [key, value] of Object.entries(control.validators || {})) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      let val: any = this.model[control.key]

      if (control.type == "select") {
        if (val) {
          val = control.multi ? val.toString().split(",").map(id => +id) : +val
        }
        this.prepareOptions(control)
      }

      const fc: FormControl = this.fb.control(val, validatorsToAdd)
      fc.valueChanges.subscribe(val => {
        this.model[control.key] = val
        this.formValid.emit(this.dynForm.valid)
      })
      this.dynForm.addControl(control.key, fc)
    }
  }

  setValues(model) {
    for (const control of this.controls) {
      this.dynForm.controls[control.key].setValue(model[control.key])
    }
  }

  // normalize the various form the options can take into two forms:
  // dropdown  control.options: [{name, id}, {name, id}]
  // cascade   control.options: [Lookup]
  // where Lookup is {name, options: [{name, id}, {name, id}]}
  prepareOptions(control: DynamicFormControl) {
    control.cascade = false
    let options = control.options
    if (options == null || options == "") return
    if (Array.isArray(options)) {
      if (options.length == 0) return
      // array of strings [option,...] maps to [{id:option,name:option},...]
      if (options.every(elm => elm == null || typeof elm == "string")) {
        control.options = options.map(option => ({ name: option, id: option }))
      }
      // array of [{name, id}]
      else if (options.every(elm => elm.hasOwnProperty("name") && elm.hasOwnProperty("id"))) {
        // already good
      }
      // array of [Lookup, Lookup] where Lookup has { name, options }
      else if (options.every(elm => elm.hasOwnProperty("name") && elm.hasOwnProperty("options"))) {
        if (options.length == 1) {
          control.options = control.options[0].options
        } else {
          control.cascade = true
        }
      }
    }
    // single Lookup with { name, options }
    else if (options.hasOwnProperty("name") && options.hasOwnProperty("options")) {
      control.options = control.options.options
    }
    else {
      // unknown format
      this.log.error("Unknown options format:")
      this.log.error(json(control.options))
    }
  }

  isInput(type: string): boolean {
    return ['text', 'password', 'email', 'search', 'tel', 'url'].includes(type.toLowerCase())
  }

  async selectRow(control) {
    this.fk = control.key
    this.tableName = this.fk.replace("Id", "");
    if (!this.tableName.endsWith("s")) {
      this.tableName += "s"
    }
    const data = await this.pyramid.list(this.tableName);
    if (data.length > 0) {
      this.cols = Object.keys(data[0]).map(col => ({ header: col, field: col }));
      this.value = data
      this.browse = true
    }
  }

  selectFk(row) {
    this.browse = false
    this.dynForm.controls[this.fk].setValue(row.id)
  }

  makeLabel(key) {
    return "The " + key.replace(/([0-9A-Z])/g, " $&").toLowerCase()
  }

  json() {
    this.sanitizer.bypassSecurityTrustHtml(paint(this.dynForm.value))
  }
}
