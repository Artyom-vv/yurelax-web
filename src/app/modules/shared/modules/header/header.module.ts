import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {IconModule} from "../icon/icon.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ButtonModule} from "../button/button.module";
import {HeaderProfilePanelComponent} from './component/header-profile-panel/header-profile-panel.component';
import {LinkModule} from "../link/link.module";
import {SkinsService} from "../../services/skins.service";

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderProfilePanelComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    LinkModule,
  ],
  providers: [SkinsService]
})
export class HeaderModule {
}
