import { Injectable } from '@angular/core';
// import * as FileSaver from 'file-saver';
// import * as xl from 'xlsx';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
class ExportService {

  constructor() {
    // construct something
  }

  // fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // fileExtension = '.xlsx';

  // public exportExcel(jsonSheets: any, fileName: string): void {

  //   const workSheets = {};
  //   _.forOwn(jsonSheets, (val, key) => workSheets[key] = xl.utils.json_to_sheet(jsonSheets[key]));
  //   const wb: xl.WorkBook = { Sheets: workSheets, SheetNames: Object.keys(jsonSheets) };
  //   const excelBuffer: any = xl.write(wb, { bookType: 'xlsx', type: 'array' });
  //   this.saveExcelFile(excelBuffer, fileName);
  // }

  // private saveExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: this.fileType });
  //   FileSaver.saveAs(data, fileName + this.fileExtension);
  // }
}
