import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthComponent} from "./auth.component";
import {RegisterComponent} from "./components/register/register.component";
import {EmailVerifyComponent} from "./components/email-verify/email-verify.component";
import {CheckAuthGuard} from "../shared/services/global/check-auth.guard";
import {EmailVerifyGuard} from "../shared/services/global/email-verify.guard";
import {MLoginComponent} from "./components/m-login/m-login.component";
import {MAuthLayoutComponent} from "./components/m-login/components/m-auth-layout/m-auth-layout.component";

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
    path: 'email-verify',
    component: AuthComponent,
    canActivate: [EmailVerifyGuard],
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
