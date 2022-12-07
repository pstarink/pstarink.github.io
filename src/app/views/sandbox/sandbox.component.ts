import { Component, OnInit } from '@angular/core'
import { NotifyService } from "@components"
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Lookup } from '@shared/entities'
import { Picklists } from '@shared/models'
import { BizService, PyramidService, StoreService } from '@services'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { paint } from "@shared/utils/tools"
import * as formConfig from 'src/assets/demo/data/dynamic-form.json'
import { HelloComponent } from './hello.component'
import { NGXLogger } from 'ngx-logger'

@UntilDestroy()
@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  testForm: UntypedFormGroup
  form: UntypedFormGroup
  paint = paint
  public formConfig = formConfig
  _value
  protected picklists: Picklists


  cols = [
    { field: "src", header: "Source" },
    { field: "dst", header: "Destination" },
    //
    { type: "icon", field: "icon_trash", icon: "delete", wd: 30, click: (action, row) => this.onClick(action, row) },
  ]

  rows = [
    { src: "12345", dst: "abcde" },
    { src: "23456", dst: "bcdef" },
    { src: "34567", dst: "cdefg" },
    { src: "45678", dst: "defgh" },
  ]


  constructor(
    private pyramid: PyramidService,
    private ns: NotifyService,
    private store: StoreService,
    private fb: UntypedFormBuilder,
    private biz: BizService,
    private log: NGXLogger
  ) {
    log.trace("**sandbox")

    console.log("@sandboxComponent")
  }

  // #region DIALOGS ------------------------------------------------------------------
  message() {
    this.ns.message("This is a message from the sandbox")
  }

  info() {
    this.ns.info("Sign Up", "Complete. An email was sent to you")
  }

  alert() {
    this.ns.alert("Sign Up", "Bummer. That email address is already in use")
  }

  async confirm() {
    await this.ns.confirm("Delete", "Are you sure?")
    this.ns.message("All your bases are belong to us")
  }

  async prompt() {
    const ans = await this.ns.prompt(
      "Personal Information",
      "We need to verify that you're at least 18 yeasr old",
      "Enter your age",
      "age",
      "21"
    )
    if (ans) {
      if (await this.ns.confirm('Really?', `Are you sure you are ${ans}?`)) {
        this.ns.message(`If you say so, you're ${ans} years old`)
      }
    }
  }

  async json() {
    await this.ns.showJson("Personal Information", {
      name: "Pascual Starink",
      email: "pstarink@gmail.com",
      employer: "Elephas Biosciences",
    })
  }

  async show() {
    let model = {
      firstName: "Smart",
      lastName: "Alec",
      ratio: 0.78,
      age: 57
    }
    const resp = await this.ns.formly("Input", "Input Requested", model, this.formConfig.controls)
    if (resp) {
      this.ns.showJson("Form Data", resp)
    }
  }

  // #endregion

  onClick(event, action) {
    //
  }

  pick(option) {
    alert(option)
  }

  submit() {
    return
    if (this.form.valid) {
      this.ns.message("Submitting...")
    } else {
      this.ns.alert("Submit", "Form not valid")
    }
  }

  assert(flag: boolean, test: string) {
    console.log((flag ? "pass: " : "fail: ") + test)
  }

  assertList(flag: boolean, list: Lookup[], length = 1, test: string) {
    if (!flag) {
      console.log("fail: " + test)
      return
    }
    if (list.length != length) {
      console.log(`fail: list not expected length, ${list.length ?? 0} vs ${length}, ${test}`)
    } else {
      console.log(`pass: ${test}`)
    }
  }

  ngOnInit(): void {
    this.testForm = this.fb.group({
      vNumberUnit: [null, []],
      vNumberUnit1: [null, []],
      vNumberUnit2: [null, []],
      vNumberUnit3: [[333, 503], []],
      vNumberUnit4: [[333, 503], []],
      //
      vText: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      vTextarea: [null, [Validators.required]],
      //
      vSelectList: [null, []],
      vSelectOption: [null, []],
      vSelectListId: [null, []],
      vSelectOptionId: [null, []],
      vCascadeSingle: [null, []],
      vCascadeMulti: [null, []],
      vSelectMulti: [null, []],
      //
      vQuantity: [null, []],
      vNumber: [null, []],
      vNumber2: [3.1415, []],
      //
      vDate: [null, [Validators.required]],
      vTime: [null, []],
      vDateTime: [null, []],
      vDateRange: [null, []],
      vMonth: [null, []],
      vYear: [null, []],
      vDuration: ["11:22:33", []],
    })
    this.testForm.patchValue({ vNumberUnit4: [444, 504] })
    this.testForm.patchValue({ vText: "Joep Meloen" })
    this.testForm.patchValue({ vNumber2: 3.1415 })

    this.form = this.fb.group({
      //
      vName: [null, [Validators.required, Validators.maxLength(8)]],
      vAddress: [null, [Validators.required]],
      //
      vSelectList: [null, []],
      vSelectOption: [null, []],
      vSelectListId: [null, []],
      vSelectOptionId: [null, []],
      vCascadeSingle: [null, []],
      vCascadeMulti: [null, []],
      vSelectMulti: [null, []],
      //
      vQuantity: [null, []],
      vNumber: [null, []],
      vNumberUnit: [[999,501], []],
      //
      vDate: [null, [Validators.required]],
      vTime: [null, []],
      vDateTime: [null, []],
      vDateRange: [null, []],
      vMonth: [null, []],
      vYear: [null, []],
      vDuration: ["11:22:33", []],
      //
      vCheck: [null, []],
      vSample: [null, []]
    })
    // this.form.patchValue({ "vQuantity": 1742 })
    // this.form.patchValue({ "vNumberUnit": [4321, 604] })
  }

  async popup() {
    const resp = await this.ns.run(HelloComponent,
      {
        value: 42,
        icon: "pi-question",
        title: "Saying Hello"
      }
    )
  }

  // doConfirm(header, message): Promise<boolean> {
  //   return new Promise(resolve => {
  //     this.confirmationService.confirm({
  //       header,
  //       message,
  //       icon: 'pi pi-exclamation-triangle',
  //       accept: () => resolve(true),
  //       reject: () => resolve(false)
  //     });
  //   });
  // }


  // ngAfterViewInit() {
  //   this.tabPanels.forEach((viewRef: ViewContainerRef, index: number) => {
  //     console.log(index, viewRef, this.tabs[index]);
  //     const type = this.tabs[index];
  //     const typeP = this.contentMappings[type.type];
  //     this.createDynamicComponentService.createComponent(type, typeP, viewRef);
  //     this.changeDetector.detectChanges();
  //   });
  // }

  // createComponent(content: any, type: any, vcRef) {
  //   const componentRef = this.renderComp(content, type, vcRef)
  //   if (content.nodes && content.nodes.length) {
  //     if (!componentRef.instance.embeddedContainer) {
  //       const cmpName = componentRef.instance.constructor.name;
  //       if (cmpName != 'TabViewComponent') {
  //         throw new TypeError('Trying to render embedded content. ${cmpName} must have @ViewChild() embeddedContainer defined');
  //       }
  //     } else {
  //       content.nodes.forEach(type => {
  //         const typeP = this.contentMappings[type.type];
  //         this.createComponent(type, typeP, componentRef.instance.embeddedContainer);
  //       });
  //     }
  //   }
  // }
  //
  // addTab() {
  //   const n = this.tabView.tabs.length;
  //   // this.items.push({ header: `Tab ${n + 1}`, content: `Tab ${n + 1}`});
  //   setTimeout(_ => {
  //     const tab: TabPanel = new TabPanel(this.tabView, this.viewContainerRef, this.cd);
  //     const factory = this.componentFactoryResolver.resolveComponentFactory(HelloWorldComponent);
  //     tab.viewContainer.createComponent(factory);
  //     this.tabView.tabs.push(tab);
  //   }, 100);
  // }
}
