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

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [CheckAuthGuard],
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {
        path: 'login',
        component: LoginComponent,
        data: {route: 'login'}
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {route: 'register'}
      },
    ]
  },
  {
    path: 'which-email-recover',
    component: AuthComponent,
    children: [
      {
        path: '',
        data: {route: 'which-email-recover'},
        component: WhichEmailRecoverComponent,
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'email-verify',
    component: AuthComponent,
    canActivate: [EmailVerifyGuard, QueryParamGuard],
    data: {param: "operationId", redirectUrl: "/platform/home"},
    children: [
      {
        path: '',
        data: {route: 'email-verify'},
        component: EmailVerifyComponent,
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'minecraft',
    component: MAuthLayoutComponent,
    canActivate: [QueryParamGuard],
    data: {param: "authToken", redirectUrl: "/platform/home"},
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
