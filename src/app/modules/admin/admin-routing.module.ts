import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../shared/services/guards/auth.guard";
import {RoleGuard} from "../shared/services/guards/role-guard.service";
import {RolesEnum} from "../shared/enums/roles.enum";
import {AdminComponent} from "./admin.component";
import {AdminContentComponent} from "./components/admin-content/admin-content.component";

const routes: Routes = [
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
        title: 'Дешборд — Статистики',
        loadChildren: () => import('../admin/module/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'commerce',
        component: AdminContentComponent,
        title: 'Дешборд — Товары и предложения',
        loadChildren: () => import('../admin/module/commerce/admin-commerce.module').then(m => m.AdminCommerceModule)
      },
      {
        path: 'mini-games',
        component: AdminContentComponent,
        title: 'Дешборд — Мини-игры',
        loadChildren: () => import('../admin/module/mini-games/mini-games.module').then(m => m.MiniGamesModule)
      },
      {
        path: 'home',
        component: AdminContentComponent,
        title: 'Дешборд — Домашняя',
        loadChildren: () => import('../admin/module/home/admin-home.module').then(m => m.AdminHomeModule)
      },
      {
        path: 'wiki',
        component: AdminContentComponent,
        title: 'Дешборд — Вики',
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
