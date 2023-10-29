import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KeyGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const key = route.queryParams['key'];

    if (!key) {
      // Направляем пользователя куда-то, если key пустой
      this.router.navigate(['/platform']);
      return false;
    }

    return true;
  }
}
