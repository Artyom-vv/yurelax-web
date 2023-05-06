import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingTableComponent} from './rating-table.component';
import {RatingTablePointModule} from "./modules/rating-table-point/rating-table-point.module";
import {RatingTableHeadModule} from "./modules/rating-table-head/rating-table-head.module";
import {SkeletonModule} from "../skeleton/skeleton.module";

@NgModule({
  declarations: [
    RatingTableComponent
  ],
  exports: [
    RatingTableComponent
  ],
    imports: [
        CommonModule,
        RatingTablePointModule,
        RatingTableHeadModule,
        SkeletonModule,
    ]
})
export class RatingTableModule {
}
