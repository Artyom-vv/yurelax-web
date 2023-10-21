import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkeletonComponent} from './skeleton.component';
import {SpacingModule} from "../spacing/spacing.module";


@NgModule({
  declarations: [
    SkeletonComponent,
  ],
  exports: [
    SkeletonComponent,
  ],
  imports: [
    CommonModule,
    SpacingModule
  ]
})
export class SkeletonModule {
}
