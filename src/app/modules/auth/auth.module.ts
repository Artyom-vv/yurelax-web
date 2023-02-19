import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthService} from "./services/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from '../shared/services/global/token.interceptor';
import {LoginComponent} from './components/login/login.component';
import {AuthComponent} from './auth.component';
import {LayoutModule} from "../shared/modules/layout/layout.module";
import {HeaderModule} from "../shared/modules/header/header.module";
import {RegisterComponent} from './components/register/register.component';
import {EmailVerifyComponent} from './components/email-verify/email-verify.component';
import {CheckAuthGuard} from "../shared/services/global/check-auth.guard";
import {EmailVerifyGuard} from "../shared/services/global/email-verify.guard";
import {AuthHeaderModule} from "./modules/auth-header/auth-header.module";
import {SpacingModule} from "../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../shared/modules/button/button.module";
import {LinkModule} from "../shared/modules/link/link.module";
import {MatInputModule} from "@angular/material/input";
import {IconModule} from "../shared/modules/icon/icon.module";
import {ReactiveFormsModule} from "@angular/forms";
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import {AnimationsService} from "../shared/animations/services/animations.service";

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    EmailVerifyComponent,
    AuthLayoutComponent,
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
  ],
  providers: [
    AnimationsService,
    AuthService,
    CheckAuthGuard,
    EmailVerifyGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    }
  ]
})
export class AuthModule {
}
