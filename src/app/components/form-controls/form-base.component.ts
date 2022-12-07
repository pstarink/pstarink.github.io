import { Component, Injector, OnInit, Input, Renderer2, Type, AfterContentInit, AfterContentChecked } from '@angular/core'
import { ControlValueAccessor, FormGroup, FormControl } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { BizService, PyramidService, StoreService } from '@services'
import { Picklists } from '@shared/models'
import * as dayjs from 'dayjs'
import { NGXLogger } from 'ngx-logger'

// https://blog.angular-university.io/angular-custom-form-controls/
// https://medium.com/@vinothinikings/control-value-accessor-in-angular-dfc338ea0f18
// https://stackoverflow.com/questions/53185211/angular-7-component-inheritance-using-a-global-injector
// https://levelup.gitconnected.com/angular-get-control-in-controlvalueaccessor-b7f09a485fba
// https://stackoverflow.com/questions/44731894/get-access-to-formcontrol-from-the-custom-form-component-in-angular

@UntilDestroy()
@Component({
  selector: "value-base",
  template: "",
  styles: [],
})
export class FormBaseComponent implements OnInit, ControlValueAccessor {
  onChange: (value: any) => void
  onTouched: () => void

  _value = undefined
  _unit: number = undefined

  @Input() type = "text"
  @Input() name
  @Input() label
  @Input() prompt
  @Input() icon
  @Input() next
  @Input() accept
  @Input() disabled = false

  @Input() focus = undefined

  @Input() default = undefined

  @Input() formControlName

  protected picklists: Picklists

  protected biz: BizService
  protected pyramid: PyramidService
  protected store: StoreService
  protected log: NGXLogger

  public form: FormGroup
  public control: FormControl = null
  protected renderer: Renderer2

  constructor(protected injector: Injector) {
    this.biz = injector.get<BizService>(BizService as Type<BizService>)
    this.pyramid = injector.get<PyramidService>(PyramidService as Type<PyramidService>)
    this.store = injector.get<StoreService>(StoreService as Type<StoreService>)
    this.log = injector.get<NGXLogger>(NGXLogger as Type<NGXLogger>)
    this.renderer = injector.get<Renderer2>(Renderer2 as Type<Renderer2>)
    // this.log.trace("*form-base")
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => {
      this.picklists = picklists
    })
  }

  ngOnInit() {
    if (this.default) {
      console.log(">> default >>>", this.default)
      this._value = this.default
      this.sleepUntil(() => this.onChange != null).then(() => this.onChange(this._value))
    }    
  }

  // value set by the parent
  writeValue = (value: any) => {
    if (!Array.isArray(value)) this._value = value
  }

  registerOnChange = (fn: (_: any) => void) => this.onChange = fn
  registerOnTouched = (fn: any): void => this.onTouched = fn

  makeLabel(label) {
    return "The " + label.replace(/([0-9A-Z])/g, " $&").toLowerCase()
  }

  sleepUntil = async (condition, timeoutMs = 2500, pollMs = 50) => {
    return new Promise((resolve, reject) => {
      const t0 = +dayjs()
      const wait = setInterval(() => {
        if (condition()) {
          console.log(`Resolved after ${+dayjs() - t0} ms`)
          clearInterval(wait)
          resolve(true)
        } else if (+dayjs() - t0 > timeoutMs) {
          clearInterval(wait)
          reject()
        }
      }, pollMs)
    })
  }
}
