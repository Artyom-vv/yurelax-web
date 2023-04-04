import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorPointComponent } from './selector-point.component';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    SelectorPointComponent
  ],
  exports: [
    SelectorPointComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class SelectorPointModule { }
