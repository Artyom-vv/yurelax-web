import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "./modules/shared/shared.module";
import {AppStore} from "./store/app.store";
import {PersistenceService} from "./modules/shared/services/persistence.service";
import {SystemUserService} from "./modules/shared/services/system-user.service";
import {AuthService} from "./modules/auth/services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {AuthGuard} from "./modules/shared/services/guards/auth.guard";
import {TokenInterceptor} from "./modules/shared/services/guards/token.interceptor";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";
registerLocaleData(localeRu)

@NgModule({
  declarations: [
    AppComponent,
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
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 7000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
