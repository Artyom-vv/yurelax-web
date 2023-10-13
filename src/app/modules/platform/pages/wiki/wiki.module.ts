import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WikiComponent} from './wiki.component';
import {WikiHomeComponent} from './components/wiki-home/wiki-home.component';
import {WikiRoutingModule} from "./wiki-routing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {FooterModule} from "../../../shared/modules/footer/footer.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {LinkModule} from "../../../shared/modules/link/link.module";
import {ProfileHeaderModule} from "../profile/modules/profile-header/profile-header.module";
import {SidebarModule} from "../../modules/sidebar/sidebar.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";


@NgModule({
  declarations: [
    WikiComponent,
    WikiHomeComponent
  ],
  imports: [
    CommonModule,
    WikiRoutingModule,
    ButtonModule,
    FooterModule,
    IconModule,
    LinkModule,
    ProfileHeaderModule,
    SidebarModule,
    SpacingModule
  ]
})
export class WikiModule {
}
