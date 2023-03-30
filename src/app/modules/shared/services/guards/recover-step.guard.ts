import {map, Observable, of, switchMap} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {RolesEnum} from "../../enums/roles.enum";
import {AppStore} from "../../../../store/app.store";
import {UserStoreInterface} from "../../../../store/interfaces/user-store.interface";
import {AuthStore} from "../../../auth/store/auth.store";

@Injectable()
export class RecoverStepGuard implements CanActivate, CanActivateChild {
  constructor(
    private authStore: AuthStore,
    private router: Router
  ) {
  }
  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    return this.authStore.isRecoveringPasswordStep$.pipe(map((step) => {
      if (route.data["recoverStep"] === step) return true
      this.router.navigate(['/platform/home'])
      return false
    }))
  }
  canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => this.canActivate(route, state);
}
