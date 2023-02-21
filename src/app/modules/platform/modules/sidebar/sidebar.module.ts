import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import {LinkModule} from "../../../shared/modules/link/link.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {ProfileUserPanelModule} from "../profile/modules/profile-user-panel/profile-user-panel.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {DropoutPointModule} from "../../../shared/modules/dropout-point/dropout-point.module";



@NgModule({
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    LinkModule,
    SpacingModule,
    ProfileUserPanelModule,
    RouterLink,
    IconModule,
    RouterLinkActive,
    DropoutPointModule
  ]
})
export class SidebarModule { }
