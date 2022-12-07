import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator, AbstractControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Picklists } from '@shared/models';
import { FormBaseComponent } from './form-base.component';

// Is a text component
// When browsing a table pass in:
// - table        table name
// - cols         columns to show with some formatting info
// - valueProp    property to return when selected

@UntilDestroy()
@Component({
  selector: "form-record",
  template: `
    <p-dialog [(visible)]="browse" [modal]="true" [style]="{width:'80vw',height:'90vh','margin':'60px'}" [draggable]="true" [resizable]="false">

      <ng-template pTemplate="header">
        <dialog-header icon="database" [title]="'Select ' + title" (onClose)="browse=false"></dialog-header>
        <div class="text-2xl">{{ title }}</div>
      </ng-template>

      <ng-template pTemplate="content" class="bordr">
        <p-table [columns]="cols" [value]="rows"
          selectionMode="single" [(selection)]="row"
          (onRowSelect)="selectFk(row)" [scrollable]="true" scrollHeight="flex">

          <ng-template pTemplate="header" let-columns>
            <tr>
              <th *ngFor="let col of columns">{{ col.key }}</th>
            </tr>
          </ng-template>

          <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr [pSelectableRow]="rowData">
              <td *ngFor="let col of columns">
                {{ col.render ? col.render(rowData) : rowData[col.key] }}
              </td>
            </tr>
          </ng-template>
        </p-table>

        <div *ngIf="value?.length===0" class="empty">
          NO RECORDS
        </div>

      </ng-template>
    </p-dialog>

    <label for="form-record">{{ label }}</label>
    <span class="flex p-input-icon-right w-full">
      <i class="pi pi-database cursor-pointer" (click)="doubleClick()"></i>
      <input [id]="formControlName" pInputText type="text"
        [ngModel]="_value"
        [placeholder]="prompt ?? ''"
        class="flex-auto"
        #ctrl="ngModel"
        (dblclick)="doubleClick()"
        (keyup.enter)="enter($event.target.value)"
        (keyup)="onChange($event.target.value)"
        (blur)="onTouched()">
    </span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormRecordComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FormRecordComponent)
    }
  ]
})
export class FormRecordComponent extends FormBaseComponent implements OnInit, Validator {
  // attributes shared by two or more targets
  @Input() table
  @Input() cols
  @Input() valueProp
  @Input() title

  browse = false
  rows = []
  row = null
  picklists: Picklists = null
  ctr: AbstractControl = null

  async ngOnInit() {
    this.store.picklists$.pipe(untilDestroyed(this)).subscribe(picklists => this.picklists = picklists)
    this.title ??= this.table
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this._value ? null : { "formRecord": true }
  }

  // validateSync() {
  //   const valid = this._value?.length != 6
  //   return valid ? "ng-dirty ng-invalid" : ""
  // }

  async doubleClick() {
    const calls = [
      this.pyramid.tableColumns(this.table),
      this.pyramid.list(this.table)
    ]
    Promise.all(calls).then(([cols, rows]) => {
      this.cols = cols.map(col => ({ key: col }))
      this.rows = rows
      this.browse = true
    })
  }

  selectFk(row) {
    this.browse = false
    this._value = row[this.valueProp ?? "id"]
    this.onChange(this._value)
  }

  async enter(barcode) {
    console.log(`Validate ${barcode}`)
  }

  close() {
    console.log("Close dialog")
    this.browse = false
  }
}
