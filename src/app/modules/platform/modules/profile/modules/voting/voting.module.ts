import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingComponent } from './voting.component';
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import { VotingBannerComponent } from './components/voting-banner/voting-banner.component';



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
    SpacingModule
  ]
})
export class VotingModule { }
