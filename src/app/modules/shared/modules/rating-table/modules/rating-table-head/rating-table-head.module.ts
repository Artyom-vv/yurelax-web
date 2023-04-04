import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingTableHeadComponent } from './rating-table-head.component';
import {IconModule} from "../../../icon/icon.module";



@NgModule({
    declarations: [
        RatingTableHeadComponent
    ],
    exports: [
        RatingTableHeadComponent
    ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class RatingTableHeadModule { }
