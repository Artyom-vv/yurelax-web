import {provideServerRendering, RenderMode, ServerRoute, withRoutes} from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

const serverRoutes: ServerRoute[] = [
  {path: 'admin', renderMode: RenderMode.Client},
  {path: 'admin/**', renderMode: RenderMode.Client},
  {path: 'platform/profile', renderMode: RenderMode.Client},
  {path: 'platform/profile/**', renderMode: RenderMode.Client},
  {path: 'auth', renderMode: RenderMode.Client},
  {path: 'auth/**', renderMode: RenderMode.Client},
  {path: '**', renderMode: RenderMode.Server},
];

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
