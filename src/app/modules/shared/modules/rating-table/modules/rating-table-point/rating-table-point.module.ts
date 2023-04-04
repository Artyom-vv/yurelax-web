import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingTablePointComponent} from './rating-table-point.component';

@NgModule({
  declarations: [
    RatingTablePointComponent
  ],
  exports: [
    RatingTablePointComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class RatingTablePointModule {
}
