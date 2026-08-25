import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingComponent } from './voting.component';
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import { VotingBannerComponent } from './components/voting-banner/voting-banner.component';
import {IconModule} from "../../../../../shared/modules/icon/icon.module";



@NgModule({
    declarations: [
        VotingComponent,
        VotingBannerComponent
    ],
    exports: [
        VotingComponent
    ],
  imports: [
    CommonModule,
    SpacingModule,
    IconModule
  ]
})
export class VotingModule { }
