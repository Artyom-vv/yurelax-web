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
import {SocialPanelModule} from 'src/app/modules/shared/modules/social-panel/social-panel.module';
import {SelectionModule} from 'src/app/modules/shared/modules/selection-panel/selection-panel.module';
import {WikiHeadComponent} from './components/wiki-head/wiki-head.component';
import {WikiHomeComponent} from './pages/wiki-home/wiki-home.component';
import {RulesComponent} from './pages/rules/rules.component';
import {RefIconModule} from 'src/app/modules/shared/modules/ref-icon/ref-icon.module';
import {WikiContentComponent} from './components/wiki-content/wiki-content.component';
import {WikiPictureComponent} from './components/wiki-picture/wiki-picture.component';
import {SkeletonModule} from "../../../shared/modules/skeleton/skeleton.module";
import {WikiParagraphComponent} from './components/wiki-paragraph/wiki-paragraph.component';
import {WikiHeadlineComponent} from './components/wiki-headline/wiki-headline.component';
import {CommandsComponent} from "./pages/commands/commands.component";
import {ResourcesComponent} from "./pages/resources/resources.component";
import {ModsComponent} from "./pages/mods/mods.component";
import {UpdatesComponent} from "./pages/updates/updates.component";


@NgModule({
  declarations: [
    WikiComponent,
    WikiHomeComponent,
    RulesComponent,
    CommandsComponent,
    ResourcesComponent,
    ModsComponent,
    UpdatesComponent,
    WikiHeadComponent,
    WikiContentComponent,
    WikiPictureComponent,
    WikiParagraphComponent,
    WikiHeadlineComponent
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
    SkeletonModule
  ]
})
export class WikiModule {
}
