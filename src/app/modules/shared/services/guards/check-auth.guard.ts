import {Observable, of, switchMap} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {RolesEnum} from "../../enums/roles.enum";
import {SystemUserService} from "../system-user.service";
import {UserRes} from "../../../platform/interfaces/user.interface";

@Injectable()
export class CheckAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private appStore: AppStore,
    private router: Router,
    private systemUser: SystemUserService
  ) {
  }

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.appStore.user$.pipe(
    switchMap((userStore: UserRes | null) => {
      if (this.systemUser.getAccessToken()) {
        if (userStore?.role === RolesEnum.DEFAULT) {
          this.router.navigate(['/auth/email-verify']);
          return of(false)
        } else if (userStore?.role === RolesEnum.USER || userStore?.role === RolesEnum.ADMIN) {
          this.router.navigate(['/platform']);
          return of(false)
        }
        return of(true);
      } else {
        return of(true);
      }
    })
  );

  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
