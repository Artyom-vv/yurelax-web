import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import {HeaderModule} from "../../../shared/modules/header/header.module";
import {LayoutModule} from "../../../shared/modules/layout/layout.module";
import {ProfileSidebarComponent} from './components/profile-sidebar/profile-sidebar.component';
import {ProfileHeaderModule} from "./modules/profile-header/profile-header.module";
import {FooterModule} from "../../../shared/modules/footer/footer.module";
import {LinkModule} from "../../../shared/modules/link/link.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {
  ProfileSidebarUserPanelComponent
} from './components/profile-sidebar/components/profile-sidebar-user-panel/profile-sidebar-user-panel.component';
import {IconModule} from "../../../shared/modules/icon/icon.module";


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSidebarComponent,
    ProfileSidebarUserPanelComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HeaderModule,
    LayoutModule,
    ProfileHeaderModule,
    FooterModule,
    LinkModule,
    SpacingModule,
    IconModule
  ]
})
export class ProfileModule {
}
