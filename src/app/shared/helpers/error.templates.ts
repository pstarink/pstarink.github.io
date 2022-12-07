import { Component } from '@angular/core';

@Component({
    selector: 'valdemort-templates',
    template: `
    <val-default-errors>
        <ng-template valError="required" let-label><small class="p-error">{{ label || 'This field' }} is required</small></ng-template>
        <ng-template valError="email" let-label>{{ label || 'This field' }} must be a valid email address</ng-template>
        <ng-template valError="minlength" let-error="error" let-label>
            <small class="p-error">{{ label || 'This field' }} must be at least {{ error.requiredLength | number }} characters</small>
        </ng-template>
        <ng-template valError="maxlength" let-error="error" let-label>
            <small class="p-error">{{ label || 'This field' }} must be at most {{ error.requiredLength | number }} characters</small>
        </ng-template>
        <ng-template valError="min" let-error="error" let-label>
            <small class="p-error">{{ label || 'This field' }} must be at least {{ error.min | number }}</small>
        </ng-template>
        <ng-template valError="max" let-error="error" let-label>
            <small class="p-error">{{ label || 'This field' }} must be at most {{ error.max | number }}</small>
        </ng-template>
        <ng-template valError="formRecord" let-error="error" let-label>
            <small class="p-error">{{ label || 'This field' }} is not a datbase record</small>
        </ng-template>
        <ng-template valError="barcodeLength" let-error="error" let-label>
            <small style="p-error">{{ label || 'This' }} barcode is the wrong length</small>
        </ng-template>

    </val-default-errors>`
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ErrorTemplates { }
