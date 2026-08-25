import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {PublicGamePresentation} from './platform-game-catalog.service';
import {PlatformSessionService} from './platform-session.service';

export interface GameContentReference {id: string; code: string; name: string; active: boolean; createdAt: string}
export interface GameStatReference {id: string; code: string; active: boolean; unit?: string}
export interface GameContentReferences {games: GameContentReference[]; statistics: GameStatReference[]}
export interface GamePresentationDraft {
  id: string; gameCode: string; presentation: PublicGamePresentation; contentHash: string;
  status: 'draft' | 'published'; createdBy: string; createdAt: string; publishedAt?: string;
}

@Injectable()
/** Uses only the audited platform content workflow; no legacy API is involved. */
export class AdminGameContentService {
  constructor(private readonly http: HttpClient, private readonly session: PlatformSessionService) {}
  references(): Observable<GameContentReferences> {
    return this.http.get<GameContentReferences>(`${environment.platformApiUrl}/admin/games/presentation-references`);
  }
  drafts(gameCode: string): Observable<{items: GamePresentationDraft[]}> {
    return this.http.get<{items: GamePresentationDraft[]}>(
      `${environment.platformApiUrl}/admin/games/${encodeURIComponent(gameCode)}/presentation-drafts`);
  }
  create(gameCode: string, presentation: PublicGamePresentation): Observable<GamePresentationDraft> {
    return this.mutation(`/admin/games/${encodeURIComponent(gameCode)}/presentation-drafts`, presentation);
  }
  publish(draftId: string): Observable<GamePresentationDraft> {
    return this.mutation(`/admin/games/presentation-drafts/${encodeURIComponent(draftId)}/publish`, {});
  }
  private mutation<T>(path: string, body: unknown): Observable<T> {
    return this.session.status().pipe(switchMap(status => this.http.post<T>(
      `${environment.platformApiUrl}${path}`, body, {headers: {
        'x-csrf-token': status.csrfToken ?? '', 'idempotency-key': crypto.randomUUID(),
      }})));
  }
}
