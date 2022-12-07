import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DialogFooterModule, DialogHeaderModule, FormControlsModule, NotifyModule, TblModule } from '@components';
import { PrimeModule } from '@app/prime.module';
import { AuthGuard } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NotifyModule,
    FormControlsModule,
    DialogFooterModule,
    DialogHeaderModule,
    TblModule,
    PrimeModule,
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
