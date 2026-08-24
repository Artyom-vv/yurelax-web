import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { PlatformApiService } from '../api/platform-api.service';

/** Requires an opaque platform session without reading or decoding provider tokens. */
export const platformSessionGuard: CanActivateFn = (_route, state) => {
  const api = inject(PlatformApiService);
  const router = inject(Router);
  return api.session().pipe(
    map((session) => session.authenticated
      ? true
      : router.createUrlTree(['/login'], { queryParams: { returnTo: state.url } })),
    catchError(() => of(router.createUrlTree(['/login'], { queryParams: { returnTo: state.url } }))),
  );
};
