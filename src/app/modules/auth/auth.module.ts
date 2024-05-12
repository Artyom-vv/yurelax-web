import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthService} from "./services/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from '../shared/services/guards/token.interceptor';
import {LoginComponent} from './components/login/login.component';
import {AuthComponent} from './auth.component';
import {LayoutModule} from "../shared/modules/layout/layout.module";
import {HeaderModule} from "../shared/modules/header/header.module";
import {RegisterComponent} from './components/register/register.component';
import {EmailVerifyComponent} from './components/email-verify/email-verify.component';
import {CheckAuthGuard} from "../shared/services/guards/check-auth.guard";
import {EmailVerifyGuard} from "../shared/services/guards/email-verify.guard";
import {AuthHeaderModule} from "./modules/auth-header/auth-header.module";
import {SpacingModule} from "../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../shared/modules/button/button.module";
import {LinkModule} from "../shared/modules/link/link.module";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthLayoutComponent} from './components/auth-layout/auth-layout.component';
import {AnimationsService} from "../shared/animations/services/animations.service";
import {MLoginComponent} from './components/m-login/m-login.component';
import {MAuthLayoutComponent} from './components/m-login/components/m-auth-layout/m-auth-layout.component';
import {AuthStore} from "./store/auth.store";
import {ErrorHintWrapperModule} from "../shared/modules/error-hint-wrapper/error-hint-wrapper.module";
import {UserService} from "../platform/services/user.service";
import {PasswordStrengthModule} from "./modules/password-strength/password-strength.module";
import {RecoverPasswordVerifyComponent} from './components/recover-password-verify/recover-password-verify.component';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import {EmailCodeVerificationModule} from "./modules/email-code-verification/email-code-verification.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {WhichEmailRecoverComponent} from './components/which-email-recover/which-email-recover.component';
import {PasswordHiderModule} from "../shared/directives/password-hider/password-hider.module";
import {PersistenceService} from "../shared/services/persistence.service";
import {MailerService} from "../shared/services/mailer.service";
import {QueryParamGuard} from "../shared/services/guards/query-param.guard";
import {RecoverStepGuard} from "../shared/services/guards/recover-step.guard";
import {InputModule} from "../shared/modules/text-fields/modules/input/input.module";
import {RefIconModule} from "../shared/modules/ref-icon/ref-icon.module";
import {IconModule} from "../shared/directives/icon/icon.module";

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    EmailVerifyComponent,
    AuthLayoutComponent,
    MLoginComponent,
    MAuthLayoutComponent,
    RecoverPasswordVerifyComponent,
    RecoverPasswordComponent,
    WhichEmailRecoverComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LayoutModule,
    HeaderModule,
    AuthHeaderModule,
    SpacingModule,
    ButtonModule,
    LinkModule,
    MatInputModule,
    IconModule,
    ReactiveFormsModule,
    ErrorHintWrapperModule,
    PasswordStrengthModule,
    EmailCodeVerificationModule,
    MatSnackBarModule,
    PasswordHiderModule,
    InputModule,
    RefIconModule,
    IconModule
  ],
  providers: [
    AnimationsService,
    AuthService,
    CheckAuthGuard,
    EmailVerifyGuard,
    AuthStore,
    UserService,
    PersistenceService,
    MailerService,
    QueryParamGuard,
    RecoverStepGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    }
  ]
})
export class AuthModule {
}
