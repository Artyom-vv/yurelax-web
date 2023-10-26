import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileStoreComponent} from './profile-store.component';
import {ProfileStoreRoutingModule} from "./profile-store-routing.module";
import {DonatePanelModule} from "../profile-wallet/modules/donate-panel/donate-panel.module";
import {PromoCodeModule} from "../../modules/promo-code/promo-code.module";
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {SubscriptionComponent} from "./components/subscription/subscription.component";
import {RefIconModule} from "../../../../../shared/modules/ref-icon/ref-icon.module";
import {ButtonModule} from "../../../../../shared/modules/button/button.module";


@NgModule({
  declarations: [
    ProfileStoreComponent,
    SubscriptionComponent,
  ],
  imports: [
    CommonModule,
    ProfileStoreRoutingModule,
    DonatePanelModule,
    PromoCodeModule,
    SpacingModule,
    RefIconModule,
    ButtonModule
  ]
})
export class ProfileStoreModule {
}
