import {Observable, catchError, map, of} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {RolesEnum} from "../../enums/roles.enum";
import {PlatformSessionService} from '../platform-session.service';

@Injectable()
export class CheckAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private session: PlatformSessionService,
  ) {
  }

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> =>
    this.session.status(true).pipe(
      map(status => {
        if (!status.authenticated) return true;
        this.router.navigate(['/platform/profile/home']);
        return false;
      }),
      catchError(() => of(true))
    );

  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
