import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {AuthLayoutComponent} from './components/auth-layout/auth-layout.component';
import {AuthHeaderModule} from './modules/auth-header/auth-header.module';
import {AnimationsService} from '../shared/animations/services/animations.service';
import {ButtonModule} from '../shared/modules/button/button.module';
import {HeaderModule} from '../shared/modules/header/header.module';
import {LayoutModule} from '../shared/modules/layout/layout.module';
import {SpacingModule} from '../shared/modules/spacing/spacing.module';
import {CheckAuthGuard} from '../shared/services/guards/check-auth.guard';
import {ReactiveFormsModule} from '@angular/forms';
import {InputModule} from '../shared/modules/text-fields/modules/input/input.module';
import {ErrorHintWrapperModule} from '../shared/modules/error-hint-wrapper/error-hint-wrapper.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RegisterComponent} from './components/register/register.component';
import {EmailVerifyComponent} from './components/email-verify/email-verify.component';
import {WhichEmailRecoverComponent} from './components/which-email-recover/which-email-recover.component';
import {RecoverPasswordVerifyComponent} from './components/recover-password-verify/recover-password-verify.component';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import {LinkModule} from '../shared/modules/link/link.module';
import {PasswordStrengthModule} from './modules/password-strength/password-strength.module';
import {EmailCodeVerificationModule} from './modules/email-code-verification/email-code-verification.module';
import {RefIconModule} from '../shared/modules/ref-icon/ref-icon.module';
import {PasswordHiderModule} from '../shared/directives/password-hider/password-hider.module';

@NgModule({
  declarations: [AuthComponent, LoginComponent, AuthLayoutComponent, RegisterComponent, EmailVerifyComponent,
    WhichEmailRecoverComponent, RecoverPasswordVerifyComponent, RecoverPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LayoutModule,
    HeaderModule,
    AuthHeaderModule,
    SpacingModule,
    ButtonModule,
    ReactiveFormsModule,
    InputModule,
    ErrorHintWrapperModule,
    MatSnackBarModule,
    LinkModule,
    PasswordStrengthModule,
    EmailCodeVerificationModule,
    RefIconModule,
    PasswordHiderModule,
  ],
  providers: [AnimationsService, CheckAuthGuard]
})
export class AuthModule {}
