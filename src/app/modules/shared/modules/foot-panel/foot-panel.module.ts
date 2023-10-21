import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootPanelComponent } from './foot-panel.component';
import {RefIconModule} from "../ref-icon/ref-icon.module";



@NgModule({
  declarations: [
    FootPanelComponent
  ],
  exports: [
    FootPanelComponent
  ],
  imports: [
    CommonModule,
    RefIconModule
  ]
})
export class FootPanelModule { }
