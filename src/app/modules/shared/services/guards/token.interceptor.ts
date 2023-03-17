import {EMPTY, map, Observable, of, switchMap, tap, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SystemUserService} from '../system-user.service';
import {AppStore} from "../../../../store/app.store";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../auth/services/auth.service";
import {ToolsService} from "../tools.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private appStore: AppStore,
    private router: Router,
    private systemUserService: SystemUserService,
    private authService: AuthService,
    private toolsService: ToolsService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = this.systemUserService.getAccessToken();
    const refreshToken = this.systemUserService.getRefreshToken();

    const accessTokenExpired = this.toolsService.tokenExpired(accessToken)
    const refreshTokenExpired = this.toolsService.tokenExpired(refreshToken)

    const modifiedRequest = (accessToken: string) => {
      if (req.url.includes(`${environment.apiUrl}`)) {
        if (accessToken) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
      }

      if (!req.url.includes('auth/refresh-token')) return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => this.handleAuthError(error))
      );
      return next.handle(req)
    }

    if (!req.headers.get('Anonymous')) {
      if (!refreshTokenExpired) {
        if (accessTokenExpired) return this.authService.refreshToken(refreshToken).pipe(switchMap((tokens) => modifiedRequest(tokens.accessToken)))
        return modifiedRequest(accessToken)
      } else {
        this.authService.deleteCookies()
        this.systemUserService.logout();
        this.router.navigate(['/auth'],
          {
            queryParams: {
              sessionFailed: true,
            },
          })
        return EMPTY
      }
    } else {
      return next.handle(req)
    }
  }

  private handleAuthError(error: HttpErrorResponse) {
    if (error.status === 401) {}
    return throwError(() => error);
  }

}
