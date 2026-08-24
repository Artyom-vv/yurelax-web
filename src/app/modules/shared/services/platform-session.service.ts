import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID, DOCUMENT} from '@angular/core';
import {Observable, of, switchMap, tap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {
  PlatformAccessContext,
  PlatformPlayerProfile,
  PlatformSessionStatus
} from '../interfaces/platform-session.interface';

@Injectable({providedIn: 'root'})
export class PlatformSessionService {
  private currentStatus: PlatformSessionStatus | null = null;

  constructor(
    private readonly http: HttpClient,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  status(refresh = false): Observable<PlatformSessionStatus> {
    if (!isPlatformBrowser(this.platformId)) return of({authenticated: false});
    if (!refresh && this.currentStatus) return of(this.currentStatus);
    return this.http.get<PlatformSessionStatus>(`${environment.platformApiUrl}/session`).pipe(
      tap(status => this.currentStatus = status)
    );
  }

  profile(): Observable<PlatformPlayerProfile> {
    return this.http.get<PlatformPlayerProfile>(`${environment.platformApiUrl}/me/profile`);
  }

  access(): Observable<PlatformAccessContext> {
    return this.http.get<PlatformAccessContext>(`${environment.platformApiUrl}/me/access`);
  }

  beginLogin(returnTo = '/platform/profile/home'): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const target = `${environment.platformApiUrl}/session/login?returnTo=${encodeURIComponent(returnTo)}`;
    this.document.location.assign(target);
  }

  login(identifier: string, password: string): Observable<void> {
    return this.http.post<void>(`${environment.platformApiUrl}/session/login`, {identifier, password}).pipe(
      tap(() => this.currentStatus = null)
    );
  }

  logout(): Observable<void> {
    return this.status().pipe(
      switchMap(status => this.http.post<void>(`${environment.platformApiUrl}/session/logout`, null, {
        headers: {'x-csrf-token': status.csrfToken ?? ''}
      })),
      tap(() => this.currentStatus = {authenticated: false})
    );
  }
}
