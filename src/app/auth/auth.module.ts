import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { RouterModule, Routes } from "@angular/router"
import { PrimeModule } from '@app/prime.module'

const routes: Routes = [
  // { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  // { path: 'access', loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule) },
  { path: "login", loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  // { path: 'forgotpassword', loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) },
  // { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  // { path: 'newpassword', loadChildren: () => import('./newpassword/newpassword.module').then(m => m.NewPasswordModule) },
  // { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
  // { path: 'lockscreen', loadChildren: () => import('./lockscreen/lockscreen.module').then(m => m.LockScreenModule) },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeModule,
    AuthRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
