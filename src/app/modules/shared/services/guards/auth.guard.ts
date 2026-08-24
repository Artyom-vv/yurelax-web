import {Observable, map, catchError, of} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {PlatformSessionService} from '../platform-session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private session: PlatformSessionService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
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
