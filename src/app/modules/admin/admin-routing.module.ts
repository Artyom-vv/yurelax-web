import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../shared/services/guards/auth.guard";
import {RoleGuard} from "../shared/services/guards/role-guard.service";
import {RolesEnum} from "../shared/enums/roles.enum";
import {AdminComponent} from "./admin.component";

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
        redirectTo: 'statistics',
        pathMatch: 'full'
      },
      {
        path: 'statistics',
        loadChildren: () => import('../admin/module/statistics/statistics.module').then(m => m.StatisticsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
