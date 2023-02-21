import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropoutPointComponent } from './dropout-point.component';
import {IconModule} from "../icon/icon.module";



@NgModule({
  declarations: [
    DropoutPointComponent
  ],
  exports: [
    DropoutPointComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class DropoutPointModule { }
