/* eslint-disable @angular-eslint/no-output-native */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tbl',
  templateUrl: './tbl.component.html',
  styleUrls: ['./tbl.component.scss']
  // styles: [`
  // :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
  //     position: -webkit-sticky;
  //     position: sticky;
  //     top: 56px;
  // }
  //`]
})
export class TblComponent {
  @Input() value = []
  @Input() cols = []
  @Output() click = new EventEmitter<any>()

  selection

  onRowSelect(event, row) {
    event.stopPropagation()
    this.click.emit(row)
  }

  selectRow(event) {
    console.log(">>>>" + event.data.id)
  }
}
