import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./modules/profile-home/profile-home.module').then(m => m.ProfileHomeModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./modules/profile-wallet/profile-wallet.module').then(m => m.ProfileWalletModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
