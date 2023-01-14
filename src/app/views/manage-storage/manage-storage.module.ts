import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ChangedInfoModule, DialogHeaderModule, DialogFooterModule, FormControlsModule, NotifyModule, TblModule, NotifyService } from '@components'
import { PrimeModule } from '@app/prime.module';
import { AuthGuard } from '@shared/helpers'
import { SharedModule } from '@shared/shared.module'
import { ManageStorageComponent } from './manage-storage.component'
import { DialogService } from 'primeng/dynamicdialog'

const routes: Routes = [
  {
    path: '',
    component: ManageStorageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PrimeModule,
    DialogFooterModule,
    DialogHeaderModule,
    ChangedInfoModule,
    FormControlsModule,
    NotifyModule,
    TblModule,
  ],
  declarations: [
    ManageStorageComponent
  ],
  providers: [
    NotifyService,
    DialogService
  ]
})
export class ManageStorageModule { }
