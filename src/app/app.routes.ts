import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: "auth",
    title: 'Yurelax — Авторизация',
    loadChildren: () => import("../app/modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'platform',
    title: 'Yurelax — необычный сервер с сюжетом и мини-играми',
    loadChildren: () => import('./modules/platform/platform.module').then(m => m.PlatformModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/modules/admin/admin.module').then(m => m.AdminModule)
  },
];
