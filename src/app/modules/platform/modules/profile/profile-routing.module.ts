import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileHomeComponent} from "./modules/profile-home/profile-home.component";

const routes: Routes = [
  {path: '', component: ProfileHomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
