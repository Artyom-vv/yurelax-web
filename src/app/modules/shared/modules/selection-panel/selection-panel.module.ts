import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionPanelComponent } from './selection-panel.component';
import {SpacingModule} from "../spacing/spacing.module";
import {IconModule} from "../icon/icon.module";
import { RefIconModule } from '../ref-icon/ref-icon.module';



@NgModule({
  declarations: [
    SelectionPanelComponent
  ],
  exports: [
    SelectionPanelComponent
  ],
  imports: [
    CommonModule,
    SpacingModule,
    IconModule,
    SpacingModule,
    RefIconModule
  ]
})
export class SelectionModule { }
