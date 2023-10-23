import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileStoreComponent} from "./profile-store.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',

    component: ProfileStoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileStoreRoutingModule {
}
