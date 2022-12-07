import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared';
import { SharedModule } from '@app/shared';
import { AppCodeModule } from '@app/components/app.code/app.code.module';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    DocsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppCodeModule,
    RouterModule.forChild(routes),
  ]
})
export class DocsModule { }
