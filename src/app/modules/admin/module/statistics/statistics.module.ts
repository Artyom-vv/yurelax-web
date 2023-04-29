import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsComponent} from './statistics.component';
import {StatisticsRoutingModule} from "./statistics-routing.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {StatisticsCreateComponent} from './components/statistics-create/statistics-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {ErrorHintWrapperModule} from "../../../shared/modules/error-hint-wrapper/error-hint-wrapper.module";
import {
  ErrorHintConditionModule
} from "../../../shared/modules/error-hint-wrapper/modules/error-hint-condition/error-hint-condition.module";
import {StatisticsService} from "../../../shared/services/statistics.service";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {StatisticsItemComponent} from './components/statistics-item/statistics-item.component';
import {RequestsCancellerService} from "../../../shared/services/requests-canceller.service";
import {AnimationsService} from "../../../shared/animations/services/animations.service";

@NgModule({
  declarations: [
    StatisticsComponent,
    StatisticsCreateComponent,
    StatisticsItemComponent,
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SpacingModule,
    ReactiveFormsModule,
    MatInputModule,
    ErrorHintWrapperModule,
    ErrorHintConditionModule,
    ButtonModule,
    IconModule,
    MatSnackBarModule
  ],
  providers: [
    StatisticsService,
    RequestsCancellerService,
    AnimationsService
  ]
})
export class StatisticsModule {
}
