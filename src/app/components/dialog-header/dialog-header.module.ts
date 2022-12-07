/* eslint-disable @angular-eslint/no-output-native */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { NotifyService } from '@components';
import { PrimeModule } from '@app/prime.module';

@Component({
  selector: 'dialog-header',
  template: `
    <div *ngIf="title" class="dlg-header flex align-items-center w-full p-3 shadow-1">
      <i *ngIf="icon" class="text-2xl pi pi-{{icon}} mr-3"></i>
      <div class="text-xl flex-auto">{{ title }}</div>
      <button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-text" (click)="onClose()"></button>
    </div>`
})
export class DialogHeaderComponent {
  @Input() title
  @Input() icon
  @Output() close = new EventEmitter()

  constructor(public ns: NotifyService) {
    // ctor
  }

  onClose() {
    this.ns?.close()
    this.close.emit()
  }
}

@NgModule({
  imports: [
    CommonModule,
    PrimeModule
  ],
  declarations: [DialogHeaderComponent],
  exports: [DialogHeaderComponent],
})
export class DialogHeaderModule { }
