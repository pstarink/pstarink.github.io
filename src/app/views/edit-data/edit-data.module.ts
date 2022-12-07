import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotifyModule, TblModule } from '@components';
import { PrimeModule } from '@app/prime.module';
import { AuthGuard } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { EditDataComponent } from './edit-data.component';

const routes: Routes = [
  {
    path: '',
    component: EditDataComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NotifyModule,
    TblModule,
    PrimeModule,
  ],
  declarations: [EditDataComponent]
})
export class EditDataModule { }
