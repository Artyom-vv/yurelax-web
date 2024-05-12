import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextAreaComponent} from "./components/text-area/text-area.component";
import {TextAreaDirective} from './directives/text-area.directive';
import {InputBaseComponent} from "../../components/input-base/input-base.component";

@NgModule({
  declarations: [
    TextAreaComponent,
    TextAreaDirective
  ],
  imports: [
    CommonModule,
    InputBaseComponent,
  ],
  exports: [
    TextAreaComponent,
    TextAreaDirective
  ]
})
export class TextAreaModule {
}
