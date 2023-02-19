import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {RouterModule} from "@angular/router";
import {FooterModule} from "../footer/footer.module";
import {AnimationsService} from "../../animations/services/animations.service";

@NgModule({
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FooterModule
  ],
  providers: [
    AnimationsService
  ]
})
export class LayoutModule {
}
