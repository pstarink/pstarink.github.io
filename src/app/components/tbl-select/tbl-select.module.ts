import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TblSelectComponent } from './tbl-select.component';
import { SharedModule } from '@shared/shared.module';
import { PrimeModule } from 'app/prime.module';

@NgModule({
  declarations: [
    TblSelectComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    SharedModule
  ],
  exports: [
    TblSelectComponent
  ]
})
export class TblSelectModule { }
