import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminHomeComponent} from './admin-home.component';
import {AdminHomeRoutingModule} from "./admin-home-routing.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";


@NgModule({
  declarations: [
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    SpacingModule,
    ButtonModule
  ]
})
export class AdminHomeModule {
}
