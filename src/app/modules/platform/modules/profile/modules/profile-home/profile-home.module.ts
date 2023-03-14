import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileHomeComponent} from './profile-home.component';
import {ProfileHomeRoutingModule} from "./profile-home-routing.module";
import {SkinsViewerModule} from "../skins-viewer/skins-viewer.module";
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";

@NgModule({
  declarations: [
    ProfileHomeComponent
  ],
  imports: [
    CommonModule,
    ProfileHomeRoutingModule,
    SkinsViewerModule,
    SpacingModule
  ]
})
export class ProfileHomeModule {
}
