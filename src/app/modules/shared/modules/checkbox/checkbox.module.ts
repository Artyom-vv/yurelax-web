import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import {ReactiveFormsModule} from "@angular/forms";
import {IconModule} from "../icon/icon.module";



@NgModule({
    declarations: [
        CheckboxComponent
    ],
    exports: [
        CheckboxComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconModule
  ]
})
export class CheckboxModule { }
