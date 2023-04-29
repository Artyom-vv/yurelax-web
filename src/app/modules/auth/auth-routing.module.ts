import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthComponent} from "./auth.component";
import {RegisterComponent} from "./components/register/register.component";
import {EmailVerifyComponent} from "./components/email-verify/email-verify.component";
import {CheckAuthGuard} from "../shared/services/guards/check-auth.guard";
import {MLoginComponent} from "./components/m-login/m-login.component";
import {MAuthLayoutComponent} from "./components/m-login/components/m-auth-layout/m-auth-layout.component";
import {WhichEmailRecoverComponent} from "./components/which-email-recover/which-email-recover.component";
import {EmailVerifyGuard} from "../shared/services/guards/email-verify.guard";
import {QueryParamGuard} from "../shared/services/guards/query-param.guard";
import {RecoverStepGuard} from "../shared/services/guards/recover-step.guard";
import {RecoverPasswordVerifyComponent} from "./components/recover-password-verify/recover-password-verify.component";
import {RecoverPasswordComponent} from "./components/recover-password/recover-password.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {
        path: 'login',
        canActivate: [CheckAuthGuard],
        component: LoginComponent,
        data: {route: 'login'},
      },
      {
        path: 'register',
        canActivate: [CheckAuthGuard],
        component: RegisterComponent,
        data: {route: 'register'},
      },
      {
        path: 'which-email-recover',
        component: WhichEmailRecoverComponent,
        data: {route: 'which-email-recover'},
      },
      {
        path: 'email-verify',
        canActivate: [EmailVerifyGuard],
        component: EmailVerifyComponent,
        data: {route: 'email-verify'},
      },
      {
        path: 'recover-password-verify',
        canActivate: [RecoverStepGuard],
        component: RecoverPasswordVerifyComponent,
        data: {route: 'recover-password-verify', recoverStep: 'verify'},
      },
      {
        path: 'recover-password',
        canActivate: [RecoverStepGuard],
        component: RecoverPasswordComponent,
        data: {route: 'recover-password', recoverStep: 'recover'},
      },
    ]
  },
  {
    path: 'minecraft',
    component: MAuthLayoutComponent,
    children: [
      {
        path: '',
        data: {route: 'minecraft'},
        component: MLoginComponent,
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
