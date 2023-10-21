import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimationOpacityDirective} from "./animation-opacity.directive";


@NgModule({
  declarations: [
    AnimationOpacityDirective
  ],
  exports: [
    AnimationOpacityDirective
  ],
  imports: [
    CommonModule
  ]
})
export class AnimationOpacityModule {
}
