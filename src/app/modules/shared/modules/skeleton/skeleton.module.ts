import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkeletonComponent} from './skeleton.component';
import {WikiTitleComponent} from "../../../platform/pages/wiki/components/wiki-title/wiki-title.component";
import {SpacingModule} from "../spacing/spacing.module";


@NgModule({
  declarations: [
    SkeletonComponent,
    WikiTitleComponent
  ],
  exports: [
    SkeletonComponent,
    WikiTitleComponent
  ],
  imports: [
    CommonModule,
    SpacingModule
  ]
})
export class SkeletonModule {
}
