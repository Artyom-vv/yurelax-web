import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import {
  CabinetData,
  CommerceEntitlement,
  CommerceOffer,
  CommercePurchase,
  ItemPage,
  PlayerProfile,
  WebSessionState,
} from './platform-api.models';

@Injectable({ providedIn: 'root' })
/** Typed same-origin client for the explicit platform BFF allow-list. */
export class PlatformApiService {
  constructor(private readonly http: HttpClient) {}

  session(): Observable<WebSessionState> {
    return this.http.get<WebSessionState>('/api/session');
  }

  cabinet(): Observable<CabinetData> {
    return forkJoin({
      profile: this.http.get<PlayerProfile>('/api/me/profile'),
      offers: this.http.get<ItemPage<CommerceOffer>>('/api/storefront'),
      purchases: this.http.get<ItemPage<CommercePurchase>>('/api/me/purchases', { params: { limit: '20' } }),
      entitlements: this.http.get<ItemPage<CommerceEntitlement>>('/api/me/entitlements', { params: { limit: '50' } }),
    });
  }

  logout(csrfToken: string): Observable<void> {
    return this.http.post<void>('/api/session/logout', null, {
      headers: new HttpHeaders({ 'X-CSRF-Token': csrfToken }),
    });
  }
}
