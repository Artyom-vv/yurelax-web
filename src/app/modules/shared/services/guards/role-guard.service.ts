import {Observable, of, switchMap} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {RolesEnum} from "../../enums/roles.enum";
import {AppStore} from "../../../../store/app.store";
import {UserRes} from "../../../platform/interfaces/user.interface";

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(private appStore: AppStore, private router: Router) {
  }

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.appStore.user$.pipe(
    switchMap((userStore: UserRes | null) => {
      if (route.data["roles"].includes(userStore?.role)) return of(true);
      this.router.navigate(['/platform'])
      return of(false);
    })
  );
  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
