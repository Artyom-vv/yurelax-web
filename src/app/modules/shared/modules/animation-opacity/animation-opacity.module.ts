import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimationOpacityComponent} from './animation-opacity.component';
import {InViewModule} from "../../directives/in-view/in-view.module";


@NgModule({
  declarations: [
    AnimationOpacityComponent
  ],
  exports: [
    AnimationOpacityComponent
  ],
  imports: [
    CommonModule,
    InViewModule
  ]
})
export class AnimationOpacityModule {
}
