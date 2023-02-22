import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorHintWrapperComponent} from './error-hint-wrapper.component';
import {ErrorHintModule} from "../error-hint/error-hint.module";


@NgModule({
  declarations: [
    ErrorHintWrapperComponent
  ],
  exports: [
    ErrorHintWrapperComponent
  ],
  imports: [
    CommonModule,
    ErrorHintModule
  ]
})
export class ErrorHintWrapperModule {
}
