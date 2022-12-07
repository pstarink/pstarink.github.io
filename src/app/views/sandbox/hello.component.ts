import { Component, Inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-hello',
  template: `
    <dialog-header icon="database" [title]="data?.title"></dialog-header>

    <div class="p-4 mt-7 text-2xl">
      The magic number is {{ data?.value ?? "unknown" }}
    </div>
  `
})
export class HelloComponent implements OnInit {

  data: any = null;

  constructor(public ref: DynamicDialogRef, private dlg: DynamicDialogConfig) {
    this.data = this.dlg.data;
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.data, null, 4));
  }
}
