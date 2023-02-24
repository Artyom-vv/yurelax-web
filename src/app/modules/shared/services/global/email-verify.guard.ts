import {Observable, of, switchMap} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {RolesEnum} from "../../enums/roles.enum";
import {UserStoreInterface} from "../../../../store/interfaces/user-store.interface";
import {SystemUserService} from "./system-user.service";

@Injectable()
export class EmailVerifyGuard implements CanActivate, CanActivateChild {
  constructor(private appStore: AppStore, private router: Router, private systemUser: SystemUserService) {
  }

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.appStore.user$.pipe(
    switchMap((user: UserStoreInterface | null) => {
      if (this.systemUser.getAccessToken()) {
        if (user?.role === RolesEnum.DEFAULT && !user?.emailVerify) return of(true);
      }
      this.router.navigate(['/platform'])
      return of(false);
    })
  );

  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
