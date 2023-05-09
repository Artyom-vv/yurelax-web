import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialPanelComponent } from './social-panel.component';
import {SpacingModule} from "../spacing/spacing.module";
import {IconModule} from "../icon/icon.module";



@NgModule({
  declarations: [
    SocialPanelComponent
  ],
  exports: [
    SocialPanelComponent
  ],
  imports: [
    CommonModule,
    SpacingModule,
    IconModule
  ]
})
export class SocialPanelModule { }
