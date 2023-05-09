import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingTablePointComponent} from './rating-table-point.component';
import {SkeletonModule} from "../../../skeleton/skeleton.module";
import {AnimationsService} from "../../../../animations/services/animations.service";

@NgModule({
  declarations: [
    RatingTablePointComponent
  ],
  exports: [
    RatingTablePointComponent
  ],
  imports: [
    CommonModule,
    SkeletonModule,
  ],
  providers: [AnimationsService]
})
export class RatingTablePointModule {
}
