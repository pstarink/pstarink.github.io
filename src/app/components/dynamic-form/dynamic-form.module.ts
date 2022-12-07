import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { SharedModule } from '@shared/shared.module';
import { PrimeModule } from '@app/prime.module';

@NgModule({
  declarations: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    SharedModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
