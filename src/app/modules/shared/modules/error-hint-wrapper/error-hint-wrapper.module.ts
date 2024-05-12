import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorHintWrapperComponent} from './error-hint-wrapper.component';
import {ErrorHintFieldComponent} from "./components/error-hint-field/error-hint-field.component";
import {ErrorHintComponent} from "./components/error-hint/error-hint.component";
import {ErrorHintConditionsPipe} from './pipes/error-hint-conditions.pipe';

@NgModule({
  declarations: [
    ErrorHintWrapperComponent,
    ErrorHintFieldComponent,
    ErrorHintComponent,
    ErrorHintConditionsPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorHintWrapperComponent,
    ErrorHintFieldComponent,
    ErrorHintComponent
  ]
})
export class ErrorHintWrapperModule {
}
