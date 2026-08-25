import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsComponent } from './rewards.component';
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import { RewardsWrapperComponent } from './components/rewards-wrapper/rewards-wrapper.component';
import {IconModule} from "../../../../../shared/modules/icon/icon.module";



@NgModule({
    declarations: [
        RewardsComponent,
        RewardsWrapperComponent
    ],
    exports: [
        RewardsComponent
    ],
  imports: [
    CommonModule,
    SpacingModule,
    IconModule
  ]
})
export class RewardsModule { }
