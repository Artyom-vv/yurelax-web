import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileHomeComponent} from "./profile-home.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfileHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileHomeRoutingModule {
}
