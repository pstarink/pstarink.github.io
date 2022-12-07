import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PyramidService, StoreService } from "@services";
import { User } from "@shared/entities"
import { Picklists } from "@shared/models";
// import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { tap } from "rxjs/operators";
import { DynamicFormControl } from "../dynamic-form/dynamic-form.model";
import { NotifyComponent } from "./notify.component";
import { json } from "@shared"

@UntilDestroy()
@Injectable({ providedIn: "root" })
export class NotifyService {
  picklists: Picklists
  users: User[]

  constructor(
    private dlg: DialogService,
    private pyramid: PyramidService,
    private store: StoreService
  ) {
    store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => this.picklists = picklists)
  }

  handle: any;

  ref: DynamicDialogRef = null

  public close() {
    try {
      this.ref.close(null);
      this.ref = null;
      clearTimeout(this.handle);
      this.handle = -1;
    } catch { }
  }

  run(ctype: ComponentType<any>, options: any = {}) {
    this.close()
    return new Promise(resolve => {
      this.ref = this.dlg.open(ctype, {
        data: options,
        showHeader: false,
        closeOnEscape: true,
        dismissableMask: true,
        contentStyle: {
          padding: 0
        },
        // contentStyle: {
        //   "padding": `${options.bare ? "0" : "70px"} 16px 12px 16px`
        // },
        style: {
          "width": "50%",
          "max-width": "800px",
          "min-width": "350px"
        },
        styleClass: "lala",
        baseZIndex: 10000
      })
      if (options?.timeout > 0) {
        this.handle = setTimeout(() => this.close(), options.timeout);
      }
      return this.ref.onClose.subscribe(ans => resolve(ans));
    })
  }

  toast(summary: string, severity = 'info', detail = null) {
    // this.ms.add({ severity, summary, detail });
  }

  // convenience methods

  public message(text: string, timeout = 1500): Promise<any> {
    return this.run(NotifyComponent, { text, timeout, bare: true })
  }

  public info(title: string, text: string): Promise<any> {
    return this.run(NotifyComponent, {
      icon: "info-circle",
      title,
      text,
      acceptText: "OK"
    });
  }

  public alert(title: string, text: string): Promise<any> {
    return this.run(NotifyComponent, {
      icon: "exclamation-triangle",
      title,
      text,
      acceptText: "DISMISS"
    });
  }

  public confirm(title: string, text: string): Promise<any> {
    return this.run(NotifyComponent, {
      icon: "question-circle",
      title,
      text,
      acceptText: "OK", rejectText: "CANCEL"
    });
  }

  public async prompt(title: string, text: string, prompt: string = null, placeholder: string = null, value: string = null) {
    return this.run(NotifyComponent, {
      icon: "user-edit",
      title,
      text,
      prompt, value, placeholder,
      acceptText: "SUBMIT", rejectText: "CANCEL"
    });
  }

  public showJson(title, json) {
    return this.run(NotifyComponent, {
      title,
      json,
      icon: "code",
      acceptText: "CLOSE"
    });
  }

  public async formly(title: string, text: string, model: any, controls = null) {
    controls = controls ?? await this.createFields(title, Object.keys(model))
    // json(formControls)
    // console.log(`Form Config`, JSON.stringify(config, null, 2))
    return this.run(NotifyComponent, {
      title,
      text,
      icon: "book",
      controls,
      model,
      acceptText: "SUBMIT", rejectText: "CANCEL"
    })
  }

  async createFields(title: string, cols: string[]): Promise<DynamicFormControl[]> {
    return new Promise(async (resolve, reject) => {
      this.users = await this.pyramid.list("users");

      const controls: DynamicFormControl[] = []

      cols.forEach(async col => {
        let label = col.charAt(0).toUpperCase() + col.slice(1)
        label = label.replace(/([0-9A-Z])/g, " $&")
        console.log("$", label)
        let ctl: DynamicFormControl = null
        if (col === "id") { // primary key --------------------------------------
          ctl = new DynamicFormControl({
            type: "text",
            readonly: true
          })
        } else if (col.endsWith("Id")) { // foreign key -------------------------
          ctl = new DynamicFormControl({
            type: "fk"
          })
        }
        else if (
          col.endsWith("Type") ||
          col.endsWith("Status") ||
          col.endsWith("State")) { // lookup ------------------------------------
          const options = this.picklists.listsBySpec(col)
          ctl = new DynamicFormControl({
            type: "select",
            options: options
          })
        }
        else if (/^is[A-Z].*/.test(col)) { // flag ----------------------------
          ctl = new DynamicFormControl({
            type: "checkbox"
          })
        }
        else if (col === "changedOn") { // date -------------------------------
          ctl = new DynamicFormControl({
            type: 'date',
            showTime: true,
          })
        }
        else if (col === "changedBy") { // user -------------------------------
          const options = this.users.map(user => ({
            id: user.id,
            name: `${user.id}: ${user.name}`
          }))
          ctl = new DynamicFormControl({
            type: "select",
            options: options
          })
        } else {
          ctl = new DynamicFormControl({ // text -------------------------------------------------
            type: "text"
          })
        }
        if (ctl) {
          ctl.key = col
          ctl.name = label
          controls.push(ctl)
        }
      })
      resolve(controls)
    })
  }
}
