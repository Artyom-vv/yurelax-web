import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsComponent} from './statistics.component';
import {StatisticsRoutingModule} from "./statistics-routing.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {ErrorHintWrapperModule} from "../../../shared/modules/error-hint-wrapper/error-hint-wrapper.module";
import {StatisticsService} from "../../../shared/services/statistics.service";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RequestsCancellerService} from "../../../shared/services/requests-canceller.service";
import {AnimationsService} from "../../../shared/animations/services/animations.service";
import {InputModule} from "../../../shared/modules/text-fields/modules/input/input.module";
import {TextAreaModule} from "../../../shared/modules/text-fields/modules/text-area/text-area.module";

@NgModule({
  declarations: [
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SpacingModule,
    ReactiveFormsModule,
    MatInputModule,
    ErrorHintWrapperModule,
    ButtonModule,
    IconModule,
    MatSnackBarModule,
    InputModule,
    TextAreaModule
  ],
  providers: [
    StatisticsService,
    RequestsCancellerService,
    AnimationsService
  ]
})
export class StatisticsModule {
}
