import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { LoginComponent } from "./login.component"
import { InputTextModule } from "primeng/inputtext"
import { PasswordModule } from "primeng/password"
import { ButtonModule } from "primeng/button"
import { AppConfigModule } from "src/app/layout/config/app.config.module"
import { RouterModule, Routes } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    AppConfigModule
  ]
})
export class LoginModule { }
