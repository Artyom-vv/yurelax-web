import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileWalletComponent} from './profile-wallet.component';
import {ProfileWalletRoutingModule} from "./profile-wallet-routing.module";
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {PromoCodeModule} from "../../modules/promo-code/promo-code.module";

@NgModule({
  declarations: [
    ProfileWalletComponent,
  ],
  imports: [
    CommonModule,
    ProfileWalletRoutingModule,
    SpacingModule,
    PromoCodeModule,
  ]
})
export class ProfileWalletModule {
}
