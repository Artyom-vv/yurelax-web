import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileWalletComponent} from "./profile-wallet.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfileWalletComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileWalletRoutingModule {
}
