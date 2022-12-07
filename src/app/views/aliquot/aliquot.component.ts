import { Component, OnInit } from '@angular/core'
import { UntypedFormGroup, UntypedFormBuilder, Validators, ValidationErrors } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { BreadcrumbService, PyramidService, BizService, StoreService } from '@services'
import { ContainerModel } from '@shared/entities'
import { Profile, Picklists } from '@shared/models'
import { NotifyService } from '@components'
import * as _ from "lodash"
import { ConfirmationService, MessageService } from 'primeng/api'

@UntilDestroy()
@Component({
  selector: 'app-aliquot',
  templateUrl: './aliquot.component.html',
  styleUrls: ['./aliquot.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AliquotComponent implements OnInit {

  profile: Profile
  picklists: Picklists = null
  containerDefs: ContainerModel[] = []
  form: UntypedFormGroup

  aliquots = []
  errors = []

  _aliquots = [
    { recipe: 171, quantity: [35, 144], destination: "100053" },
    { recipe: 171, quantity: [120, 144], destination: "100074" }
  ]

  cols = [
    { field: "recipe", header: "Recipe", render: row => this.picklists?.name[row.recipe] ?? "-" },
    { field: "quantity", header: "quantity", render: row => `${row.quantity[0]} ${this.picklists?.name[row.quantity[1]]}` },
    { field: "destination", header: "Destination" },
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
      recipe: [null, []],
      quantity: [null, []],
      destination: [null, [Validators.required]]
    })
    this.form.get("destination").valueChanges.subscribe(x => {
      console.log(`source changed to ${x}`)
    })
  }

  onClick(action, row) {
    if (action == "delete") {
      this.aliquots = this.aliquots.filter(set => set != row)
      this.ns.toast("Worklist item removed")
    }
  }

  onRecipe(recipe) {
    console.log(recipe)
  }

  onDestination(bc: string) {
    this.addItems()
    this.form.patchValue({ destination: null })
  }

  addItems() {
    if (!this.form.invalid) {
      const aliquot = Object.assign({}, this.form.value)
      this.aliquots = [...this.aliquots, aliquot]
    }
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
