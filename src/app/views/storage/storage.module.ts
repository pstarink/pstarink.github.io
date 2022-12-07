import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChangedInfoModule, DialogFooterModule, DialogHeaderModule, FormControlsModule, NotifyModule } from '@components'
import { PrimeModule } from '@app/prime.module';
import { AuthGuard } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { StorageComponent } from './storage.component';

const routes: Routes = [
  {
    path: '',
    component: StorageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    DialogFooterModule,
    DialogHeaderModule,
    ChangedInfoModule,
    FormControlsModule,
    NotifyModule,
    PrimeModule,
  ],
  declarations: [StorageComponent]
})
export class StorageModule { }
