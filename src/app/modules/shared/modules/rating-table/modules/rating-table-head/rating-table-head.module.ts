import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingTableHeadComponent } from './rating-table-head.component';
import {IconModule} from "../../../icon/icon.module";
import {SkeletonModule} from "../../../skeleton/skeleton.module";



@NgModule({
    declarations: [
        RatingTableHeadComponent
    ],
    exports: [
        RatingTableHeadComponent
    ],
    imports: [
        CommonModule,
        IconModule,
        SkeletonModule
    ]
})
export class RatingTableHeadModule { }
