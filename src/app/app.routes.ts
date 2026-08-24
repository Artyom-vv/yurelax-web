import { Routes } from '@angular/router';
import { platformSessionGuard } from './platform/session/platform-session.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'cabinet', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Yurelax — вход',
    loadComponent: () => import('./platform/session/login.component').then((module) => module.LoginComponent),
  },
  {
    path: 'cabinet',
    title: 'Yurelax — кабинет игрока',
    canActivate: [platformSessionGuard],
    loadComponent: () => import('./platform/cabinet/cabinet.component').then((module) => module.CabinetComponent),
  },
  { path: '**', redirectTo: 'cabinet' },
];
