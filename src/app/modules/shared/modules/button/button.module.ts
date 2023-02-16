import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import {IconModule} from "../icon/icon.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    MatButtonModule,
  ]
})
export class ButtonModule {
}
