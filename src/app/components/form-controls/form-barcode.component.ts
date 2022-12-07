import { Component, forwardRef, Inject, Injector, Input, OnInit, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator, AbstractControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BizService, PyramidService, StoreService } from '@services';
import { ContainerModel, Lookup, Well } from '@shared/entities'
import { Picklists } from '@shared/models'
import { NGXLogger } from 'ngx-logger';
import { FormBaseComponent } from './form-base.component'

@UntilDestroy()
@Component({
  selector: "form-barcode",
  styleUrls: ["./components.scss"],
  template: `
    <p-dialog [(visible)]="browse" [modal]="true" [style]="{width:'100vw',height:'100vh','margin':'60px'}" [draggable]="true" [resizable]="false">
      <ng-template pTemplate="header">
        <div class="text-2xl">{{ title }}</div>
      </ng-template>
      <ng-template pTemplate="content">
        <p-table [columns]="cols" [value]="value"
          selectionMode="single" [(selection)]="row"
          (onRowSelect)="selectFk(row)"
          [paginator]="value?.length" [rows]="15">
          <ng-template pTemplate="header" let-columns>
            <tr>
              <th *ngFor="let col of columns">{{ col.header }}</th>
            </tr>
          </ng-template>

          <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr [pSelectableRow]="rowData">
              <td *ngFor="let col of columns">
                {{ col.render ? col.render(rowData) : rowData[col.field] }}
              </td>
            </tr>
          </ng-template>
        </p-table>

        <div *ngIf="value?.length===0" class="empty">
          NO DATA
        </div>

      </ng-template>
    </p-dialog>

    <label [for]="formControlName">{{ label }}</label>
    <span class="flex" [class.p-input-icon-left]="icon">
      <i *ngIf="icon" class="pi pi-{{icon}}"></i>
      <input pInputText
        [id]="formControlName"
        type="text"
        [(ngModel)]="_value"
        #ctrl="ngModel"
        (dblclick)="doubleClick()"
        class="flex-auto"
        (keyup.enter)="enter($event.target.value)"
        (keydown.tab)="enter($event.target.value)"
        (keyup)="onChange($event.target.value)"
        (blur)="onTouched()">
    </span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormBarcodeComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormBarcodeComponent)
    }
  ]
})
export class FormBarcodeComponent extends FormBaseComponent implements Validator, OnInit {

  // type can be: container, instrument, location, consumable

  @Input() step                 // container step
  @Input() status               // item status
  @Input() project              // project name
  @Input() available
  @Input() containerType        // container type

  // container content
  @Input() sample               // sample name
  @Input() recipe               // recipe sku
  @Input() exclusive = false    // only ingredient in container

  // instrument -----------------------
  @Input() instrumentType       // instrument key or name
  @Input() instrumentStatus     // instrument key or name

  // location -------------------------
  @Input() locationType         // location type
  @Input() holderType           // location type
  @Input() fixed

  browse = false
  data = null
  cols = [
    { field: "barcode", header: "Barcode" },
    { field: "type", header: "Type", render: row => this.getType(row) },
  ]
  row = null
  defs: ContainerModel[] = null
  picklists: Picklists = null
  ctr: AbstractControl = null

  // parent defines: biz, pyramid, store, log
  constructor(protected injector: Injector, protected renderer: Renderer2) {
    super(injector)
    this.log.trace("*form-barcode")
  }

  async ngOnInit() {
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => this.picklists = picklists)
    this.defs = await this.pyramid.list("ContainerModels")
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.ctr = this.ctr || control
    const bc = control.value
    console.log("Barcode control validation")
    if (bc?.length != 6) {
      return { barcodeLength: bc?.length }
    }
    return null
  }

  validateSync() {
    const valid = this._value?.length != 6
    return valid ? "ng-dirty ng-invalid" : ""
  }

  async doubleClick() {
    const data = await this.pyramid.list("Containers");
    if (data.length > 0) {
      this.cols = Object.keys(data[0]).map(col => ({ header: col, field: col }));
      this.data = data
      this.browse = true
    }
  }

  selectFk(row) {
    this.browse = false
    this._value = row.barcode
    this.onChange(row.barcode)
  }

  getType(row) {
    const cd = this.defs.find(def => def.id == row.containerModelId)
    return this.picklists?.name[cd?.containerType ?? 0] ?? "?"
  }

  async tab(barcode) {
    this.log.trace("TAB")
  }

  async enter(barcode) {
    console.log(`Validating ${barcode} ... pass`)

    if (this.next && this.control.valid) {
      this.renderer.selectRootElement(`#${this.next}`).focus();
    }
    // await this.validateSample(barcode)

    // let valid = false
    // if (this.recipe) {
    //   valid = await this.validateRecipe(barcode)
    // } else if (this.sample) {
    //   valid = await this.validateSample(barcode)
    // } else if (this.instrumentType) {
    //   valid = await this.validateInstrument(barcode)
    // } else if (this.locationType) {
    //   valid = await this.validateLocation(barcode)
    // }
  }

  async validateRecipe(barcode: string): Promise<boolean> {
    // get the container
    const cntr = await this.biz.loadContainer(barcode, "content")
    return true
  }

  async validateSample(barcode: string): Promise<boolean> {
    this.log.debug("")
    // get the container
    const cntr: any = await this.biz.loadContainer(barcode, "content")
    if (cntr) {
      // const samples = cntr.wells.map((w: Well) => w.sampleId)
      // console.log(samples);
    }
    return true
  }

  async validateInstrument(barcode: string): Promise<boolean> {
    return true
  }

  async validateLocation(barcode: string): Promise<boolean> {
    return true
  }
}
