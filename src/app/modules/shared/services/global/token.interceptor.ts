import {Observable, of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SystemUserService} from './system-user.service';
import {AppStore} from "../../../../store/app.store";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../auth/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private appStore: AppStore, private router: Router, private systemUserService: SystemUserService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.systemUserService.getAccessToken();

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

  private handleAuthError(error: HttpErrorResponse) {
    if (error.status === 401) {
      const refreshToken = this.systemUserService.getRefreshToken();
      this.authService.refreshToken(refreshToken).pipe(
        catchError((err) => {
          this.systemUserService.logout();
          this.router.navigate(['/auth'],
            {
              queryParams: {
                sessionFailed: true,
              },
            })
          return of(false)
        })
      ).subscribe()
    }

    return throwError(() => error);
  }

}
