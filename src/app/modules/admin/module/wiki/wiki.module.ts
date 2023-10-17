import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WikiComponent} from './wiki.component';
import {WikiRoutingModule} from "./wiki-routing.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {LinkModule} from "../../../shared/modules/link/link.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    WikiComponent
  ],
  imports: [
    CommonModule,
    WikiRoutingModule,
    SpacingModule,
    ButtonModule,
    LinkModule,
    IconModule,
    MatSnackBarModule
  ]
})
export class WikiModule {
}
