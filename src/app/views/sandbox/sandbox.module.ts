import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SandboxComponent } from './sandbox.component';
import { ControlErrorsModule, DialogHeaderModule, FormControlsModule, NotifyModule, NotifyService, TblModule } from '@components';
import { PrimeModule } from '@app/prime.module';
import { AuthGuard } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { HelloComponent } from './hello.component';
import { DialogService } from 'primeng/dynamicdialog'

const routes: Routes = [
  {
    path: '',
    component: SandboxComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ControlErrorsModule,
    NotifyModule,
    DialogHeaderModule,
    TblModule,
    FormControlsModule,
    PrimeModule,
  ],
  declarations: [
    SandboxComponent,
    HelloComponent
  ],
  providers: [
    NotifyService,
    DialogService
  ]
})
export class SandboxModule { }
