import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {LinkModule} from "../../../shared/modules/link/link.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {DropoutPointModule} from "../../../shared/modules/dropout-point/dropout-point.module";
import {SidebarUserPanelComponent} from "./components/sidebar-user-panel/sidebar-user-panel.component";
import {SkeletonModule} from "../../../shared/modules/skeleton/skeleton.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {DonateModalModule} from "../../pages/profile/pages/profile-wallet/modules/donate-modal/donate-modal.module";
import {
  DonateModalService
} from "../../pages/profile/pages/profile-wallet/modules/donate-modal/services/donate-modal.service";

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarUserPanelComponent
  ],
  exports: [
    SidebarComponent,
    SidebarUserPanelComponent
  ],
  imports: [
    CommonModule,
    LinkModule,
    SpacingModule,
    RouterLink,
    IconModule,
    RouterLinkActive,
    DropoutPointModule,
    SkeletonModule,
    ButtonModule,
    DonateModalModule
  ],
  providers: [DonateModalService]
})
export class SidebarModule {
}
