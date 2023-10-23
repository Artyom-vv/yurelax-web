import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileContentComponent} from "./components/profile-content/profile-content.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: ProfileContentComponent,
    title: 'Профиль — Домашняя',
    loadChildren: () => import('./pages/profile-home/profile-home.module').then(m => m.ProfileHomeModule)
  },
  {
    path: 'wallet',
    component: ProfileContentComponent,
    title: 'Профиль — Кошелёк',
    loadChildren: () => import('./pages/profile-wallet/profile-wallet.module').then(m => m.ProfileWalletModule)
  },
  {
    path: 'store',
    component: ProfileContentComponent,
    title: 'Профиль — Магазин',
    loadChildren: () => import('./pages/profile-store/profile-store.module').then(m => m.ProfileStoreModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
