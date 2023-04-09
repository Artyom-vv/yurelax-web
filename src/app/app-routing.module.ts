import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: "auth",
    loadChildren: () => import("../app/modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'platform',
    loadChildren: () => import('./modules/platform/platform.module').then(m => m.PlatformModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/modules/admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
