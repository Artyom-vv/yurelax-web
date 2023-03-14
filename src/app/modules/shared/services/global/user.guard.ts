import {Observable, of, switchMap} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {RolesEnum} from "../../enums/roles.enum";
import {AppStore} from "../../../../store/app.store";
import {UserStoreInterface} from "../../../../store/interfaces/user-store.interface";

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private appStore: AppStore, private router: Router) {
  }

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.appStore.user$.pipe(
    switchMap((userStore: UserStoreInterface | null) => {
      if (userStore?.user?.role === RolesEnum.USER) return of(true);

      this.router.navigate(['/auth'])
      return of(false);
    })
  );
  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
