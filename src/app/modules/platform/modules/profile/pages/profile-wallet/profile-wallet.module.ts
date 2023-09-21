import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileWalletComponent} from './profile-wallet.component';
import {ProfileWalletRoutingModule} from "./profile-wallet-routing.module";
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {PromoCodeModule} from "../../modules/promo-code/promo-code.module";
import {DonatePanelModule} from "./modules/donate-panel/donate-panel.module";
import {RefIconModule} from "../../../../../shared/modules/ref-icon/ref-icon.module";

@NgModule({
  declarations: [
    ProfileWalletComponent,
  ],
    imports: [
        CommonModule,
        ProfileWalletRoutingModule,
        SpacingModule,
        PromoCodeModule,
        DonatePanelModule,
        RefIconModule,
    ]
})
export class ProfileWalletModule {
}
