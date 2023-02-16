import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {IconModule} from "../icon/icon.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ButtonModule} from "../button/button.module";

@NgModule({
  declarations: [
    HeaderComponent
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
  ]
})
export class HeaderModule {
}
