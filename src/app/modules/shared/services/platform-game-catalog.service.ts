import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

export interface PublicGamePresentation {
  description: string;
  icon: string;
  iconStroked: boolean;
  heroImageUrl?: string;
  featuredStatCodes: string[];
}

export interface PublicGame {
  code: string;
  name: string;
  presentation: PublicGamePresentation;
}

export interface PublicGamePage { items: PublicGame[]; }

@Injectable({providedIn: 'root'})
/** Reads the recoverable player-facing game catalog through the public BFF boundary. */
export class PlatformGameCatalogService {
  constructor(private readonly http: HttpClient) {}

  list(): Observable<PublicGamePage> {
    return this.http.get<PublicGamePage>(`${environment.platformApiUrl}/games`);
  }
}
