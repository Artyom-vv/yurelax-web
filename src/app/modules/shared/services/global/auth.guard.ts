import {Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {SystemUserService} from "./system-user.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private systemUser: SystemUserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.systemUser.getAccessToken()) return of(true);

    this.router.navigate(['/auth'], {
      queryParams: {
        accessDenied: true,
      },
    });
    return of(false);
  }

  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
