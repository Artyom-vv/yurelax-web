import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link.component';
import {IconModule} from "../icon/icon.module";



@NgModule({
    declarations: [
        LinkComponent
    ],
    exports: [
        LinkComponent
    ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class LinkModule { }
