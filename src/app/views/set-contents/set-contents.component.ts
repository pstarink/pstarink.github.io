import { Component, OnInit } from '@angular/core'
import { UntypedFormGroup, UntypedFormBuilder, Validators, ValidationErrors } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { PyramidService, BizService, StoreService } from '@services'
import { ContainerModel } from '@shared/entities'
import { Profile, Picklists } from '@shared/models'
import { NotifyService } from '@components'
import * as _ from "lodash"
import { ConfirmationService, MessageService } from 'primeng/api'

@UntilDestroy()
@Component({
  selector: 'set-contents',
  templateUrl: './set-contents.component.html',
  styleUrls: ['./set-contents.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class SetContentsComponent implements OnInit {

  profile: Profile
  picklists: Picklists = null
  containerDefs: ContainerModel[] = []
  form: UntypedFormGroup
  recipeForm: UntypedFormGroup

  showAddRecipe: boolean = false

  aliquots = []
  errors = []

  _aliquots = [
    { recipe: 171, quantity: [35, 144], destination: "100053" },
    { recipe: 172, quantity: [120, 144], destination: "100074" }
  ]

  cols = [
    { field: "destination", header: "Destination" },
    { field: "recipe", header: "Recipe", render: row => this.picklists?.name[row.recipe] ?? "-" },
    { field: "quantity", header: "Quantity", render: row => this.formatQuantity(row?.quantity) },
    //
    { type: "icon", icon: "delete", wd: 30, click: (action, row) => this.onClick(action, row) },
  ]

  constructor(
    public pyramid: PyramidService,
    public store: StoreService,
    private biz: BizService,
    private fb: UntypedFormBuilder,
    private ns: NotifyService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.store.profile$.pipe(untilDestroyed(this)).subscribe(profile => this.profile = profile)
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => {
      this.picklists = picklists
      this.aliquots = this._aliquots
    })

    this.form = this.fb.group({
      destination: [null, [Validators.required]],
      recipe: [null, [Validators.required]],
      quantity: [null, [Validators.required]]
    })

    // test change subscription
    this.form.get("destination").valueChanges.subscribe(x => {
      // console.log(`Destination changed to ${x}`)
    })
  }

  onClick(action, row) {
    if (action == "delete") {
      this.aliquots = this.aliquots.filter(set => set != row)
      this.ns.toast("Worklist item removed")
    }
  }

  onDestination(bc: string) {
    this.addReagent()
    this.form.patchValue({ destination: null })
  }

  addReagent() {
    if (!this.form.invalid) {
      const aliquot = Object.assign({}, this.form.value)
      this.aliquots = [...this.aliquots, aliquot]
    }
  }

  formatQuantity(ary: any) {
    if (!ary || !Array.isArray(ary) || ary.length < 2 || !ary[2]) return "-"
    return `${ary[0]}` + ((ary.length == 2) ? ` ${this.picklists?.name[ary[1]] || ""}` : "")
  }

  async create() {
    const contents = []
    const ts = new Date().toISOString()
    this.aliquots.forEach(aliquot => {
      console.log(`Aliquot ${aliquot.quantity[0]} ${this.picklists?.name[aliquot.quantity[1]]} of ${this.picklists?.name[aliquot.recipe]} to ${aliquot.destination}`)
      // create
      contents.push({
        barcode: aliquot.destination,
        wells: [
          {
            row: 0,
            col: 0,
            wellStatus: this.picklists.idByKey("WellStatus|Valid"),
            contents: [
              {
                recipeId: aliquot.recipe,
                quantity: aliquot.quantity[0],
                unitType: aliquot.quantity[1],
                clientId: this.profile.clientId,
                changedBy: this.profile.id,
                changedOn: ts
              }
            ]
          }
        ]
      })
    })
    if (contents.length > 0) {
      await this.pyramid.setContents(contents)
    }
    this.aliquots = []
  }

  async cancel() {
    if (this.aliquots.length > 0) {
      const resp = await this.ns.confirm("Clear Worklist", "Are you sure you want to remove all worklist items?")
      if (resp) {
        this.aliquots = []
      }
    }
  }

  getFormValidationErrors(form: UntypedFormGroup) {
    this.errors = []
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.errors.push({
            control: key,
            keyError: keyError,
            errorValue: controlErrors[keyError]
          })
        })
      }
    })
  }
}
