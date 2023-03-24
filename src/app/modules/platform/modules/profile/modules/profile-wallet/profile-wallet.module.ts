import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileWalletComponent} from './profile-wallet.component';
import {ProfileWalletRoutingModule} from "./profile-wallet-routing.module";

@NgModule({
  declarations: [
    ProfileWalletComponent,
  ],
  imports: [
    CommonModule,
    ProfileWalletRoutingModule,
  ]
})
export class ProfileWalletModule {
}
