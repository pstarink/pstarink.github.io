/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Component, OnInit } from '@angular/core'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import * as _ from "lodash"
import { UntypedFormGroup } from '@angular/forms'
import { paint } from "@shared"
import { DomSanitizer } from '@angular/platform-browser'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'dyndlg',
  templateUrl: './notify.component.html',
  providers: [MessageService],
  host: { 'class': 'flex flex-column max-h-90' }
})
export class NotifyComponent {
  options: any = null
  model: any = null
  form = new UntypedFormGroup({})
  valid = true
  count = 0

  constructor(
    public ref: DynamicDialogRef,
    private dlg: DynamicDialogConfig,
    private sanitizer: DomSanitizer
  ) {
    this.options = dlg.data
    this.options.msg = !(this.options.title || this.options.fields || this.options.prompt)
    if (this.options.model) {
      this.model = _.clone(this.options.model)
    }
    this.options.action = !!(this.options.rejectText || this.options.acceptText)
    if (this.options.json) {
      this.options.json = this.sanitizer.bypassSecurityTrustHtml(paint(this.options.json))
    }
    this.convertDates()
  }

  reject() {
    this.ref?.close(null)
  }

  accept() {
    if (this.valid) {
      this.convertDates()
      this.options.model = this.model
      this.ref?.close(this.model || this.options.value || true)
    }
  }

  convertDates() {
    const ctls = this.options.formConfig?.controls.filter(ctl => ctl.type == "date" && this.model[ctl.key])
    ctls?.forEach(ctl => {
      if (Array.isArray(this.model[ctl.key]))
        this.model[ctl.key] = this.model[ctl.key].map(dt => this.convertDate(dt))
      else
        this.model[ctl.key] = this.convertDate(this.model[ctl.key])
    })
  }

  convertDate(date: any) {
    if (!date) return date
    return (date instanceof Date) ? date.toISOString() : new Date(date)
  }

  setValid(valid: boolean) {
    console.log(valid)
    this.valid = valid
    this.count++
  }
}
