import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InViewDirective} from "./in-view.directive";


@NgModule({
  declarations: [
    InViewDirective
  ],
  exports: [
    InViewDirective
  ],
  imports: [
    CommonModule
  ]
})
export class InViewModule {
}
