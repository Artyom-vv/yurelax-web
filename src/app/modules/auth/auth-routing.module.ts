import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './components/login/login.component';
import {CheckAuthGuard} from '../shared/services/guards/check-auth.guard';

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
      // Registration, recovery and Minecraft linking are owned by the platform identity flow.
      {path: '**', redirectTo: 'login'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
