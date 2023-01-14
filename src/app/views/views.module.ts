import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, Routes } from "@angular/router"
import { PrimeModule } from "@app/prime.module"
import { DialogService } from "primeng/dynamicdialog"
import { NotifyService } from "@app/components"

const routes: Routes = [
  {
    path: "empty",
    loadChildren: () => import("./empty/empty.module").then(m => m.EmptyModule)
  },
  {
    path: "dash",
    loadChildren: () => import("./dash/dash.module").then(m => m.DashModule)
  },
  {
    path: "four",
    loadChildren: () => import("./four/four.module").then(m => m.FourModule)
  },
  // -----
  {
    path: "sandbox",
    loadChildren: () => import("./sandbox/sandbox.module").then(m => m.SandboxModule)
  },
  {
    path: "lookups",
    loadChildren: () => import("./lookups/lookups.module").then(m => m.LookupsModule)
  },
  {
    path: "manage-lookups",
    loadChildren: () => import("./manage-lookups/manage-lookups.module").then(m => m.ManageLookupsModule)
  },
  {
    path: "manage-recipes",
    loadChildren: () => import("./manage-recipes/manage-recipes.module").then(m => m.ManageRecipesModule)
  },
  {
    path: "storage",
    loadChildren: () => import("./storage/storage.module").then(m => m.StorageModule)
  },
  {
    path: "manage-storage",
    loadChildren: () => import("./manage-storage/manage-storage.module").then(m => m.ManageStorageModule)
  },
  {
    path: "users",
    loadChildren: () => import("./users/users.module").then(m => m.UsersModule)
  },
  //
  // {
  //   path: "activity",
  //   loadChildren: () => import("./activity/activity.module").then(m => m.ActivityModule)
  // },
  {
    path: "create-items",
    loadChildren: () => import("./create-items/create-items.module").then(m => m.CreateItemsModule)
  },
  {
    path: "edit-data",
    loadChildren: () => import("./edit-data/edit-data.module").then(m => m.EditDataModule)
  },
  {
    path: "set-contents",
    loadChildren: () => import("./set-contents/set-contents.module").then(m => m.SetContentsModule)
  },
  {
    path: "aliquot",
    loadChildren: () => import("./aliquot/aliquot.module").then(m => m.AliquotModule)
  },
  {
    path: "docs",
    loadChildren: () => import("./docs/docs.module").then(m => m.DocsModule)
  }
]

@NgModule({
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DialogService,
    NotifyService
  ]
})
export class ViewsModule { }
