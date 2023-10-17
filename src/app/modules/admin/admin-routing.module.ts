import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../shared/services/guards/auth.guard";
import {RoleGuard} from "../shared/services/guards/role-guard.service";
import {RolesEnum} from "../shared/enums/roles.enum";
import {AdminComponent} from "./admin.component";
import {AdminContentComponent} from "./components/admin-content/admin-content.component";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../admin/module/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    component: AdminComponent,
    data: {roles: [RolesEnum.ADMIN]},
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'statistics',
        component: AdminContentComponent,
        loadChildren: () => import('../admin/module/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'mini-games',
        component: AdminContentComponent,
        loadChildren: () => import('../admin/module/mini-games/mini-games.module').then(m => m.MiniGamesModule)
      },
      {
        path: 'home',
        component: AdminContentComponent,
        loadChildren: () => import('../admin/module/home/admin-home.module').then(m => m.AdminHomeModule)
      },
      {
        path: 'wiki',
        component: AdminContentComponent,
        loadChildren: () => import('../admin/module/wiki/wiki.module').then(m => m.WikiModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
