import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "./modules/shared/shared.module";
import {AppStore} from "./store/app.store";
import {PersistenceService} from "./modules/shared/services/global/persistence.service";
import {SystemUserService} from "./modules/shared/services/global/system-user.service";
import {AuthService} from "./modules/auth/services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {AuthGuard} from "./modules/shared/services/global/auth.guard";
import {UserGuard} from "./modules/shared/services/global/user.guard";
import {TokenInterceptor} from "./modules/shared/services/global/token.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    AppStore,
    CookieService,
    PersistenceService,
    SystemUserService,
    AuthService,
    AuthGuard,
    UserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
