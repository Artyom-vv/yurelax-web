import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {PlatformSessionService} from './platform-session.service';

export interface GameLinkResult {
  playerId: string;
  currentName: string;
  identities: Array<{provider: string}>;
}

@Injectable({providedIn: 'root'})
/** Confirms a proxy-issued game link without exposing platform credentials to Minecraft. */
export class PlatformGameLinkService {
  constructor(private readonly http: HttpClient, private readonly session: PlatformSessionService) {}

  /** Approves one short-lived code for the current first-party web session. */
  approve(userCode: string): Observable<GameLinkResult> {
    return this.session.status(true).pipe(switchMap(status => this.http.post<GameLinkResult>(
      `${environment.platformApiUrl}/me/game-links/${encodeURIComponent(userCode)}/approve`, null,
      {headers: {'x-csrf-token': status.csrfToken ?? ''}},
    )));
  }
}
