import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './components/login/login.component';
import {CheckAuthGuard} from '../shared/services/guards/check-auth.guard';
import {RegisterComponent} from './components/register/register.component';
import {EmailVerifyComponent} from './components/email-verify/email-verify.component';
import {WhichEmailRecoverComponent} from './components/which-email-recover/which-email-recover.component';
import {RecoverPasswordVerifyComponent} from './components/recover-password-verify/recover-password-verify.component';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';

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
      {path: 'register', canActivate: [CheckAuthGuard], component: RegisterComponent, data: {route: 'register'}},
      {path: 'email-verify', canActivate: [CheckAuthGuard], component: EmailVerifyComponent, data: {route: 'email-verify'}},
      {path: 'which-email-recover', canActivate: [CheckAuthGuard], component: WhichEmailRecoverComponent, data: {route: 'recover'}},
      {path: 'recover-password-verify', canActivate: [CheckAuthGuard], component: RecoverPasswordVerifyComponent, data: {route: 'recover-verify'}},
      {path: 'recover-password', canActivate: [CheckAuthGuard], component: RecoverPasswordComponent, data: {route: 'recover-password'}},
      {path: '**', redirectTo: 'login'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
