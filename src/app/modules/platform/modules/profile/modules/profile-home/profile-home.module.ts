import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileHomeComponent} from './profile-home.component';
import {ProfileHomeRoutingModule} from "./profile-home-routing.module";
import {SkinsViewerModule} from "../skins-viewer/skins-viewer.module";
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {ProfileUserPanelModule} from "../profile-user-panel/profile-user-panel.module";
import {SalesOfferModule} from "../sales-offer/sales-offer.module";

@NgModule({
  declarations: [
    ProfileHomeComponent,
  ],
    imports: [
        CommonModule,
        ProfileHomeRoutingModule,
        SkinsViewerModule,
        SpacingModule,
        ProfileUserPanelModule,
        SalesOfferModule
    ]
})
export class ProfileHomeModule {
}
