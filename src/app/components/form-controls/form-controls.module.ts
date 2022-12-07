import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PrimeModule } from '@app/prime.module';

import {
  FormBarcodeComponent,
  FormCheckComponent,
  FormDateComponent,
  FormNumberComponent,
  FormRecordComponent,
  FormSelectComponent,
  FormTextComponent,
} from '.';

const Components = [
  FormBarcodeComponent,
  FormCheckComponent,
  FormDateComponent,
  FormNumberComponent,
  FormRecordComponent,
  FormSelectComponent,
  FormTextComponent,
]

@NgModule({
  declarations: [...Components],
  imports: [
    CommonModule,
    SharedModule,
    PrimeModule
  ],
  exports: [...Components]
})
export class FormControlsModule { }
