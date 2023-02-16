import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthComponent} from "./auth.component";
import {RegisterComponent} from "./components/register/register.component";
import {EmailVerifyComponent} from "./components/email-verify/email-verify.component";
import {CheckAuthGuard} from "../shared/services/global/check-auth.guard";
import {EmailVerifyGuard} from "../shared/services/global/email-verify.guard";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [CheckAuthGuard],
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {
    path: 'email-verify',
    component: EmailVerifyComponent,
    canActivate: [EmailVerifyGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
