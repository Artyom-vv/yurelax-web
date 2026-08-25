import {isPlatformBrowser} from '@angular/common';
import {catchError, map, Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {RolesEnum} from "../../enums/roles.enum";
import {PlatformSessionService} from '../platform-session.service';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(
    private session: PlatformSessionService,
    private router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
  }

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    // Role claims belong to the browser session and are unavailable during SSR.
    // Backend authorization remains authoritative for every protected endpoint.
    if (!isPlatformBrowser(this.platformId)) return of(true);
    return this.session.access().pipe(
      map(access => {
        const role = access.roles.some(value => value !== 'PLAYER') ? RolesEnum.ADMIN : RolesEnum.USER;
        if (route.data['roles'].includes(role)) return true;
        this.router.navigate(['/platform']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/platform']);
        return of(false);
      })
    );
  };
  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
