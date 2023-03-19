import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select.component';
import {MatSelectModule} from "@angular/material/select";
import {IconModule} from "../icon/icon.module";
import {DropoutPointModule} from "../dropout-point/dropout-point.module";
import {SelectBlockerComponent} from './components/select-blocker/select-blocker.component';
import {SelectService} from "./services/select.service";


@NgModule({
  declarations: [
    SelectComponent,
    SelectBlockerComponent
  ],
  exports: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    IconModule,
    DropoutPointModule,
  ],
  providers: [SelectService]
})
export class SelectModule {
}
