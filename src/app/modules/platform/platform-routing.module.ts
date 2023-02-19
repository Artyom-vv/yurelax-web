import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlatformComponent} from "./platform.component";
import {HomeComponent} from "./modules/home/home.component";
import {AuthGuard} from "../shared/services/global/auth.guard";
import {UserGuard} from "../shared/services/global/user.guard";
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'profile',
    canActivate: [AuthGuard, UserGuard],
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'home',
    component: PlatformComponent,
    children: [
      {path: '', component: HomeComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
