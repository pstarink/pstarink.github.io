import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChangedInfoModule, DialogHeaderModule, FormControlsModule, NotifyModule, TblModule } from '@components';
import { PrimeModule } from '@app/prime.module';
import { AuthGuard } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { AliquotComponent } from './aliquot.component';
import { ValdemortModule } from 'ngx-valdemort';

const routes: Routes = [
  {
    path: '',
    component: AliquotComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NotifyModule,
    ChangedInfoModule,
    FormControlsModule,
    DialogHeaderModule,
    PrimeModule,
    TblModule,
    ValdemortModule
  ],
  declarations: [AliquotComponent]
})
export class AliquotModule { }
