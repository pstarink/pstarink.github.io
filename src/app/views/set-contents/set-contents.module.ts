import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChangedInfoModule, DialogHeaderModule, FormControlsModule, NotifyModule, TblModule } from '@components';
import { PrimeModule } from '@app/prime.module';
import { AuthGuard } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { SetContentsComponent } from './set-contents.component';
import { ValdemortModule } from 'ngx-valdemort';
import { DialogFooterModule } from '@app/components';

const routes: Routes = [
  {
    path: '',
    component: SetContentsComponent,
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
    DialogFooterModule,
    PrimeModule,
    TblModule,
    ValdemortModule
  ],
  declarations: [SetContentsComponent]
})
export class SetContentsModule { }
