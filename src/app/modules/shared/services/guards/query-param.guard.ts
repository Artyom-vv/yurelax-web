import {Observable, of} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class QueryParamGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router
  ) {
  }
  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    if (!route.queryParams[route.data["param"]]) this.router.navigate([route.data["redirectUrl"]])
    return of(!!route.queryParams[route.data["param"]])
  }
  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
