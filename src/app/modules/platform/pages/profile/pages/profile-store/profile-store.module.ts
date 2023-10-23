import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileStoreComponent} from './profile-store.component';
import {ProfileStoreRoutingModule} from "./profile-store-routing.module";
import {DonatePanelModule} from "../profile-wallet/modules/donate-panel/donate-panel.module";
import {PromoCodeModule} from "../../modules/promo-code/promo-code.module";
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";


@NgModule({
  declarations: [
    ProfileStoreComponent
  ],
  imports: [
    CommonModule,
    ProfileStoreRoutingModule,
    DonatePanelModule,
    PromoCodeModule,
    SpacingModule
  ]
})
export class ProfileStoreModule {
}
