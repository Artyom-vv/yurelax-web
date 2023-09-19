import {Observable, of, switchMap} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {SystemUserService} from "../system-user.service";
import {UserRes} from "../../../platform/interfaces/user.interface";

@Injectable()
export class EmailVerifyGuard implements CanActivate, CanActivateChild {
  constructor(private appStore: AppStore, private router: Router, private systemUser: SystemUserService) {
  }

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.appStore.user$.pipe(
    switchMap((userStore: UserRes | null) => {
      if (this.systemUser.getAccessToken()) {
        if (!userStore?.emailVerify) return of(true);
      }
      this.router.navigate(['/platform'])
      return of(false);
    })
  );

  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
