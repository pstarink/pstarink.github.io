import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TblComponent } from './tbl.component';
import { SharedModule } from '@shared/shared.module';
import { PrimeModule } from '@app/prime.module';

@NgModule({
  declarations: [
    TblComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    SharedModule
  ],
  exports: [
    TblComponent
  ]
})
export class TblModule { }
