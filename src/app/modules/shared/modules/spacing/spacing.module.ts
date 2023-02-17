import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpacingComponent} from './spacing.component';


@NgModule({
  declarations: [
    SpacingComponent
  ],
  exports: [
    SpacingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SpacingModule {
}
