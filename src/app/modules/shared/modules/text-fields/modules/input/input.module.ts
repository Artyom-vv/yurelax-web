import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './components/input/input.component';
import {InputDirective} from './directives/input.directive';
import {InputBaseComponent} from "../../components/input-base/input-base.component";
import {IconRightDirective} from "../../../../directives/icon-right.directive";
import {IconLeftDirective} from "../../../../directives/icon-left.directive";

@NgModule({
  declarations: [
    InputComponent,
    InputDirective,
  ],
  imports: [
    CommonModule,
    InputBaseComponent,
    IconRightDirective,
    IconLeftDirective,
  ],
  exports: [
    InputDirective,
    InputComponent
  ]
})
export class InputModule {
}
