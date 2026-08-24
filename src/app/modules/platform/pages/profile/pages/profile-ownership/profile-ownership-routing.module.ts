import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileOwnershipComponent} from './profile-ownership.component';

const routes: Routes = [{path: '', pathMatch: 'full', component: ProfileOwnershipComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileOwnershipRoutingModule {}
