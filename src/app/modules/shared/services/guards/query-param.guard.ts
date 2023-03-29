import {Observable, of, switchMap} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {RolesEnum} from "../../enums/roles.enum";
import {AppStore} from "../../../../store/app.store";
import {UserStoreInterface} from "../../../../store/interfaces/user-store.interface";

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
