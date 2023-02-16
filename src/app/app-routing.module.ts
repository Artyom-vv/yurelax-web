import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./modules/shared/services/global/auth.guard";
import {AdminGuard} from "./modules/shared/services/global/admin.guard";
import {UserGuard} from "./modules/shared/services/global/user.guard";

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: "auth",
    loadChildren: () => import("../app/modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'platform',
    canActivate: [AuthGuard, UserGuard],
    loadChildren: () => import('./modules/platform/platform.module').then(m => m.PlatformModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('../app/modules/admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
