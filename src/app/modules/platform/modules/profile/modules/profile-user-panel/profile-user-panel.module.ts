import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUserPanelComponent } from './profile-user-panel.component';
import {SkeletonModule} from "../../../../../shared/modules/skeleton/skeleton.module";
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";



@NgModule({
  declarations: [
    ProfileUserPanelComponent
  ],
  exports: [
    ProfileUserPanelComponent
  ],
  imports: [
    CommonModule,
    SkeletonModule,
    SpacingModule
  ]
})
export class ProfileUserPanelModule { }
