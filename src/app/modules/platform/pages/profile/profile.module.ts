import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import {HeaderModule} from "../../../shared/modules/header/header.module";
import {LayoutModule} from "../../../shared/modules/layout/layout.module";
import {ProfileHeaderModule} from "./modules/profile-header/profile-header.module";
import {FooterModule} from "../../../shared/modules/footer/footer.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {LinkModule} from "../../../shared/modules/link/link.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {ProfileContentComponent} from './components/profile-content/profile-content.component';
import {AnimationsService} from "../../../shared/animations/services/animations.service";
import {SidebarModule} from "../../modules/sidebar/sidebar.module";
import {RefIconModule} from "../../../shared/modules/ref-icon/ref-icon.module";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileContentComponent,
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        HeaderModule,
        LayoutModule,
        ProfileHeaderModule,
        FooterModule,
        SidebarModule,
        SpacingModule,
        LinkModule,
        ButtonModule,
        IconModule,
        RefIconModule,
    ],
  providers: [
    AnimationsService
  ],
})
export class ProfileModule {
}
