import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WikiComponent} from './wiki.component';
import {WikiRoutingModule} from "./wiki-routing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {FooterModule} from "../../../shared/modules/footer/footer.module";
import {LinkModule} from "../../../shared/modules/link/link.module";
import {ProfileHeaderModule} from "../profile/modules/profile-header/profile-header.module";
import {SidebarModule} from "../../modules/sidebar/sidebar.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {SocialPanelModule} from 'src/app/modules/shared/modules/social-panel/social-panel.module';
import {SelectionModule} from 'src/app/modules/shared/modules/selection-panel/selection-panel.module';
import {WikiHeadComponent} from './components/wiki-head/wiki-head.component';
import {WikiHomeComponent} from './pages/wiki-home/wiki-home.component';
import {WikiPageComponent} from './pages/wiki-page/wiki-page.component';
import {RefIconModule} from 'src/app/modules/shared/modules/ref-icon/ref-icon.module';
import {WikiPictureComponent} from './components/wiki-picture/wiki-picture.component';
import {SkeletonModule} from "../../../shared/modules/skeleton/skeleton.module";
import {LayoutModule} from "../../../shared/modules/layout/layout.module";
import {AnimationOpacityModule} from "../../../shared/modules/animation-opacity/animation-opacity.module";
import {HeaderModule} from "../../../shared/modules/header/header.module";
import {FootPanelModule} from "../../../shared/modules/foot-panel/foot-panel.module";


@NgModule({
  declarations: [
    WikiComponent,
    WikiHomeComponent,
    WikiPageComponent,
    WikiHeadComponent,
    WikiPictureComponent,
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
    RefIconModule,
    SkeletonModule,
    HeaderModule,
    LayoutModule,
    AnimationOpacityModule,
    FootPanelModule,
  ]
})
export class WikiModule {
}
