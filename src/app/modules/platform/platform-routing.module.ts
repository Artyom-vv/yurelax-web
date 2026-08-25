import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlatformComponent} from "./platform.component";
import {AuthGuard} from "../shared/services/guards/auth.guard";
import {RoleGuard} from "../shared/services/guards/role-guard.service";
import {RolesEnum} from "../shared/enums/roles.enum";
import {ProfileComponent} from "./pages/profile/profile.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'home',
    component: PlatformComponent,
    children: [
      {path: '', component: HomeComponent},
    ]
  },
  {
    path: 'wiki',
    loadChildren: () => import('./pages/wiki/wiki.module').then(m => m.WikiModule)
  },
  {
    path: 'games',
    component: PlatformComponent,
    loadChildren: () => import('./pages/games/games.module').then(m => m.GamesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
