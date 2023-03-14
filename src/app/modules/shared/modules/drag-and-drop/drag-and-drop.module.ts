import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropComponent } from './drag-and-drop.component';
import {DropDirective} from "./directives/drop.directive";
import {LinkModule} from "../link/link.module";
import {IconModule} from "../icon/icon.module";



@NgModule({
  declarations: [
    DragAndDropComponent,
    DropDirective
  ],
  exports: [
    DragAndDropComponent
  ],
    imports: [
        CommonModule,
        LinkModule,
        IconModule
    ]
})
export class DragAndDropModule { }
