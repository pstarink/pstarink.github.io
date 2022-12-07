import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FourComponent } from './four.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, SharedModule } from '@shared';

const routes: Routes = [
  {
    path: '',
    component: FourComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    FourComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class FourModule { }
