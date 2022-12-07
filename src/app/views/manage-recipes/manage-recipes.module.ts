import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ChangedInfoModule, DialogHeaderModule, DialogFooterModule, FormControlsModule, NotifyModule, TblModule } from '@components'
import { PrimeModule } from '@app/prime.module';
import { AuthGuard } from '@shared/helpers'
import { SharedModule } from '@shared/shared.module'
import { ManageRecipesComponent } from './manage-recipes.component'

const routes: Routes = [
  {
    path: '',
    component: ManageRecipesComponent,
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
    ManageRecipesComponent
  ]
})
export class ManageRecipesModule { }
