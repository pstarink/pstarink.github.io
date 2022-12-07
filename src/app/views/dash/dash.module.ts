import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { ComponentsModule } from 'app/components/components.module';
// import { NotifyModule } from 'app/notify/notify.module';
// import { PartialsModule } from 'app/partials/partials.module';
import { PrimeModule } from 'src/app/prime.module';
import { AuthGuard } from '@shared/helpers';
import { SharedModule } from '@shared/shared.module';
import { DashComponent } from './dash.component';

const routes: Routes = [
  {
    path: '',
    component: DashComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    // NotifyModule,
    // PartialsModule,
    PrimeModule,
    // ComponentsModule,
  ],
  declarations: [DashComponent]
})
export class DashModule { }
