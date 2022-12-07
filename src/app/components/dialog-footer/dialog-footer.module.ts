import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { SharedModule } from '@shared';
import { NotifyService } from '..';

@Component({
  selector: 'dialog-footer',
  template: `
    <div *ngIf="rejectText || acceptText" class="flex justify-content-end align-items-center p-2 shadow-1">
      <button *ngIf="rejectText" icon="pi pi-{{rejectIcon}}" pButton pRipple type="button" class="p-button-text mr-2" [label]="rejectText" (click)="onClose()"></button>
      <p-button *ngIf="acceptText" icon="pi pi-{{acceptIcon}}" [label]="acceptText" [disabled]="!form?.valid" (click)="onAccept()"></p-button>
    </div>`
})
export class DialogFooterComponent {
  @Input() form: Form = null
  @Input() rejectIcon = "times"
  @Input() acceptIcon = "check"

  @Input() rejectText = "CANCEL"
  @Input() acceptText = "SUBMIT"

  @Output() reject = new EventEmitter()
  @Output() accept = new EventEmitter()

  constructor(public ns: NotifyService) {
    // ctor
  }

  onClose() {
    this.ns?.close()
    this.reject.emit()
  }

  onAccept() {
    this.ns?.close()
    this.accept.emit()
  }
}

@NgModule({
  imports: [SharedModule],
  declarations: [DialogFooterComponent],
  exports: [DialogFooterComponent],
})
export class DialogFooterModule { }
