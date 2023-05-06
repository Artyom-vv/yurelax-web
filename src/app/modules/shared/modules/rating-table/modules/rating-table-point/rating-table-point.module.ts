import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingTablePointComponent} from './rating-table-point.component';
import {SkeletonModule} from "../../../skeleton/skeleton.module";

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
    ]
})
export class RatingTablePointModule {
}
