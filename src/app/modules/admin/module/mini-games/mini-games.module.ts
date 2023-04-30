import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MiniGamesComponent} from './mini-games.component';
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {MiniGamesRoutingModule} from "./mini-games-routing.module";
import {MiniGamesCreateComponent} from './components/mini-games-create/mini-games-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {ErrorHintWrapperModule} from "../../../shared/modules/error-hint-wrapper/error-hint-wrapper.module";
import {
  ErrorHintConditionModule
} from "../../../shared/modules/error-hint-wrapper/modules/error-hint-condition/error-hint-condition.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MiniGamesService} from "../../../shared/services/mini-games.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CheckboxModule} from "../../../shared/modules/checkbox/checkbox.module";
import {DragAndDropModule} from "../../../shared/modules/drag-and-drop/drag-and-drop.module";
import {StatisticsService} from "../../../shared/services/statistics.service";
import {RequestsCancellerService} from "../../../shared/services/requests-canceller.service";
import {TagModule} from "../../../shared/modules/tag/tag.module";
import {SelectModule} from "../../../shared/modules/select/select.module";


@NgModule({
  declarations: [
    MiniGamesComponent,
    MiniGamesCreateComponent
  ],
    imports: [
        CommonModule,
        SpacingModule,
        MiniGamesRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        ErrorHintWrapperModule,
        ErrorHintConditionModule,
        ButtonModule,
        IconModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatCheckboxModule,
        CheckboxModule,
        DragAndDropModule,
        TagModule,
        SelectModule
    ],
  providers: [
    MiniGamesService,
    StatisticsService,
    RequestsCancellerService
  ]
})
export class MiniGamesModule {
}
