import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { AppLayoutComponent } from './layout/app.layout.component'

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled'
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dash',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '', component: AppLayoutComponent,
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule)
  },
  // {
  //   path: '', component: AppLayoutComponent,
  //   children: [
  //     { path: '', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
  //     { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
  //     { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
  //     { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
  //     { path: 'profile', loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
  //     { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
  //     { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
  //     { path: 'ecommerce', loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  //     { path: 'apps', loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) }
  //   ]
  // },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
  { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: '**', redirectTo: '/auth/login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
