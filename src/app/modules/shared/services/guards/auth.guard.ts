import {isPlatformBrowser} from '@angular/common';
import {Observable, map, catchError, of} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {PlatformSessionService} from '../platform-session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private session: PlatformSessionService,
    private router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // SSR cannot read the browser's HttpOnly session cookie. The BFF still
    // protects every data request; the browser guard performs the UI redirect.
    if (!isPlatformBrowser(this.platformId)) return of(true);
    return this.session.status(true).pipe(
      map(session => {
        if (session.authenticated) return true;
        this.router.navigate(['/auth'], {queryParams: {accessDenied: true, returnTo: state.url}});
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/auth'], {queryParams: {sessionFailed: true, returnTo: state.url}});
        return of(false);
      })
    );
  }

  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
