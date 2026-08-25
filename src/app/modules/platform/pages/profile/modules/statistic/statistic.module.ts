import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticComponent} from './statistic.component';
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {SelectModule} from "../../../../../shared/modules/select/select.module";
import {IconModule} from "../../../../../shared/modules/icon/icon.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TableSectionModule} from "../../../../../shared/modules/table-section/table-section.module";
import {StatisticsService} from "../../../../../shared/services/statistics.service";


@NgModule({
  declarations: [
    StatisticComponent
  ],
  exports: [
    StatisticComponent
  ],
    imports: [
        CommonModule,
        SpacingModule,
        SelectModule,
        IconModule,
        ReactiveFormsModule,
        TableSectionModule,
    ],
    providers: [StatisticsService],
})
export class StatisticModule {
}
