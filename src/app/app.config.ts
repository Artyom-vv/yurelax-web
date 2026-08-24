import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {AppStore} from "./store/app.store";
import {CookieService} from "ngx-cookie-service";
import {PersistenceService} from "./modules/shared/services/persistence.service";
import {SystemUserService} from "./modules/shared/services/system-user.service";
import {WikiService} from "./modules/platform/pages/wiki/services/wiki.service";
import {AuthService} from "./modules/auth/services/auth.service";
import {IconsService} from "./services/icons.service";
import {TokenInterceptor} from "./modules/shared/services/guards/token.interceptor";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {appInitializer} from "./modules/shared/factories/init.factory";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    AppStore,
    CookieService,
    PersistenceService,
    SystemUserService,
    WikiService,
    AuthService,
    IconsService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 7000}
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [IconsService]
    },
    provideAnimations(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideClientHydration()
  ]
};
