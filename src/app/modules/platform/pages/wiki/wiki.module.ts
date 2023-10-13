import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WikiComponent} from './wiki.component';
import {WikiRoutingModule} from "./wiki-routing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {FooterModule} from "../../../shared/modules/footer/footer.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {LinkModule} from "../../../shared/modules/link/link.module";
import {ProfileHeaderModule} from "../profile/modules/profile-header/profile-header.module";
import {SidebarModule} from "../../modules/sidebar/sidebar.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import { SocialPanelModule } from 'src/app/modules/shared/modules/social-panel/social-panel.module';
import { SelectionModule } from 'src/app/modules/shared/modules/selection-panel/selection-panel.module';
import { WikiHeadComponent } from './components/wiki-head/wiki-head.component';
import { WikiHomeComponent } from './pages/wiki-home/wiki-home.component';
import { RulesComponent } from './pages/rules/rules.component';
import { RefIconModule } from 'src/app/modules/shared/modules/ref-icon/ref-icon.module';


@NgModule({
  declarations: [
    WikiComponent,
    WikiHomeComponent,
    RulesComponent,
    WikiHeadComponent
  ],
  imports: [
    CommonModule,
    WikiRoutingModule,
    ButtonModule,
    FooterModule,
    LinkModule,
    ProfileHeaderModule,
    SidebarModule,
    SpacingModule,
    SocialPanelModule,
    SelectionModule,
    RefIconModule
  ]
})
export class WikiModule {
}
