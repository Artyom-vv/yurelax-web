import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropoutPointComponent } from './dropout-point.component';
import {IconModule} from "../icon/icon.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {RefIconModule} from "../ref-icon/ref-icon.module";



@NgModule({
  declarations: [
    DropoutPointComponent
  ],
  exports: [
    DropoutPointComponent
  ],
    imports: [
        CommonModule,
        IconModule,
        RouterLinkActive,
        RouterLink,
        RefIconModule
    ]
})
export class DropoutPointModule { }
