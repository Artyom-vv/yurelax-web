import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordStrengthComponent} from './password-strength.component';
import {
  PasswordStrengthStatusComponent
} from './components/password-strength-status/password-strength-status.component';


@NgModule({
  declarations: [
    PasswordStrengthComponent,
    PasswordStrengthStatusComponent
  ],
  exports: [
    PasswordStrengthComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PasswordStrengthModule {
}
