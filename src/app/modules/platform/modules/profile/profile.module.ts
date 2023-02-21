import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import {HeaderModule} from "../../../shared/modules/header/header.module";
import {LayoutModule} from "../../../shared/modules/layout/layout.module";
import {ProfileHeaderModule} from "./modules/profile-header/profile-header.module";
import {FooterModule} from "../../../shared/modules/footer/footer.module";
import {SidebarModule} from "../sidebar/sidebar.module";
import {ProfileUserPanelModule} from "./modules/profile-user-panel/profile-user-panel.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {LinkModule} from "../../../shared/modules/link/link.module";


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HeaderModule,
    LayoutModule,
    ProfileHeaderModule,
    FooterModule,
    SidebarModule,
    ProfileUserPanelModule,
    SpacingModule,
    LinkModule,
  ]
})
export class ProfileModule {
}
