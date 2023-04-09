import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CheckAuthGuard} from "../../../shared/services/guards/check-auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {AuthComponent} from "./auth.component";

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
