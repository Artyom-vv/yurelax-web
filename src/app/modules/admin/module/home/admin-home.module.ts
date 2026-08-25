import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminHomeComponent} from './admin-home.component';
import {AdminHomeRoutingModule} from "./admin-home-routing.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {RouterModule} from "@angular/router";
import {IconModule} from "../../../shared/modules/icon/icon.module";


@NgModule({
  declarations: [
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    SpacingModule,
    ButtonModule,
    RouterModule,
    IconModule
  ]
})
export class AdminHomeModule {
}
