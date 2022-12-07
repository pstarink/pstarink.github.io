import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared';

const routes: Routes = [
  {
    path: '',
    component: EmptyComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    EmptyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EmptyModule { }
