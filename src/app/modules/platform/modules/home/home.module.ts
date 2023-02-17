import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SpacingModule
  ]
})
export class HomeModule {
}
