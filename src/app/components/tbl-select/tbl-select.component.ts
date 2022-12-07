import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tbl',
  templateUrl: './tbl-select.component.html',
  styleUrls: ['./tbl-select.component.scss']
  // styles: [`
  // :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
  //     position: -webkit-sticky;
  //     position: sticky;
  //     top: 56px;
  // }
  //`]
})
export class TblSelectComponent {
  @Input() value = []
  @Input() cols = []
  @Output() rowSelect = new EventEmitter<any>()

  selection

  onRowSelect(event, row) {
    event.stopPropagation()
    this.rowSelect.emit(row)
  }

  selectRow(event) {
    console.log(">>>>" + event.data.id)
  }
}
