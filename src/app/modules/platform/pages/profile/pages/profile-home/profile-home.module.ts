import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileHomeComponent} from './profile-home.component';
import {ProfileHomeRoutingModule} from "./profile-home-routing.module";
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {ProfileUserPanelModule} from "../../modules/profile-user-panel/profile-user-panel.module";
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ProfileHomeComponent,
  ],
  imports: [
    CommonModule,
    ProfileHomeRoutingModule,
    SpacingModule,
    ProfileUserPanelModule,
    RouterModule,
  ],
})
export class ProfileHomeModule {

}
