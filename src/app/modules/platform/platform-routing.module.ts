import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlatformComponent} from "./platform.component";
import {HomeComponent} from "./modules/home/home.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: PlatformComponent,
    children: [
      {path: '', component: HomeComponent},
    ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
