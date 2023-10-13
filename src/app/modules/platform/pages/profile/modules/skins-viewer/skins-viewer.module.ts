import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkinsViewerComponent} from './skins-viewer.component';
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {DragAndDropModule} from "../../../../../shared/modules/drag-and-drop/drag-and-drop.module";
import {IconModule} from "../../../../../shared/modules/icon/icon.module";
import {ModelService} from "../../../../../shared/services/model.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    SkinsViewerComponent
  ],
  exports: [
    SkinsViewerComponent
  ],
  imports: [
    CommonModule,
    SpacingModule,
    DragAndDropModule,
    IconModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [ModelService]
})
export class SkinsViewerModule {
}
