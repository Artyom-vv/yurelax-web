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


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    EmailVerifyComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LayoutModule,
    HeaderModule,
  ],
  providers: [
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
