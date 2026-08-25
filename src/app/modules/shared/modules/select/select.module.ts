import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select.component';
import {MatSelectModule} from "@angular/material/select";
import {IconModule} from "../icon/icon.module";
import {DropoutPointModule} from "../dropout-point/dropout-point.module";


@NgModule({
  declarations: [
    SelectComponent
  ],
  exports: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    IconModule,
    DropoutPointModule,
  ]
})
export class SelectModule {
}
