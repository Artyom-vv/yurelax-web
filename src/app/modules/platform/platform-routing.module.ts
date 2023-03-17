import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlatformComponent} from "./platform.component";
import {HomeComponent} from "./modules/home/home.component";
import {AuthGuard} from "../shared/services/guards/auth.guard";
import {ProfileComponent} from "./modules/profile/profile.component";
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
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
