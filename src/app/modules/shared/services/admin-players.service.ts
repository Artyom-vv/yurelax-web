import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

export interface AdminPlayerEntry {
  playerId: string;
  currentName: string;
  minecraftName?: string;
  createdAt: string;
}

export interface AdminPlayerStatistic {
  statCode: string;
  value: string | boolean;
  aggregationKind: string;
  updatedAt: string;
}

export interface AdminRewardReceipt {
  rewardGrantId: string;
  rewardCode?: string;
  rewardName?: string;
  currencyCode?: string;
  amount: string;
  transactionReasonCode?: string;
  gameCode?: string;
  contextRef?: string;
  sourceKind?: string;
  grantedAt: string;
}

export interface AdminPurchase {
  id: string;
  offerCode: string;
  productCode: string;
  productName: string;
  quantity: number;
  currencyCode: string;
  totalPrice: string;
  purchasedAt: string;
  status: string;
}

export interface AdminEntitlement {
  id: string;
  productCode: string;
  productName: string;
  providerCode: string;
  entitlementKey: string;
  capabilityName: string;
  capabilityDescription: string;
  gameCode: string | null;
  status: string;
  grantedAt: string;
  expiresAt: string | null;
  activationState: {
    canActivate: boolean;
    blockedReason: string | null;
    activeActivation: {startsAt: string; expiresAt: string} | null;
    lifetimeUsed: number;
    lifetimeRemaining: number | null;
    periodUsed: number;
    periodRemaining: number | null;
    periodResetsAt: string | null;
  };
}

export interface AdminTimelineItem {
  sourceId: string;
  occurredAt: string;
  type: string;
  context: string;
  details: Record<string, unknown>;
}

export interface AdminPage<T> { items: T[]; page?: {nextCursor?: string | null; hasMore?: boolean}; }

@Injectable()
export class AdminPlayersService {
  constructor(private readonly http: HttpClient) {}

  players(search?: string): Observable<AdminPlayerEntry[]> {
    return this.http.get<AdminPlayerEntry[]>(`${environment.platformApiUrl}/admin/players`, {
      params: this.params({search, limit: '30'}),
    });
  }

  statistics(playerId: string, gameCode?: string): Observable<{playerId: string; items: AdminPlayerStatistic[]}> {
    return this.http.get<{playerId: string; items: AdminPlayerStatistic[]}>(this.playerPath(playerId, 'statistics'), {
      params: this.params({gameCode}),
    });
  }

  rewards(playerId: string, gameCode?: string): Observable<AdminPage<AdminRewardReceipt>> {
    return this.http.get<AdminPage<AdminRewardReceipt>>(this.playerPath(playerId, 'rewards'), {
      params: this.params({gameCode, limit: '50'}),
    });
  }

  purchases(playerId: string): Observable<AdminPage<AdminPurchase>> {
    return this.http.get<AdminPage<AdminPurchase>>(this.playerPath(playerId, 'purchases'), {
      params: this.params({limit: '50'}),
    });
  }

  entitlements(playerId: string): Observable<AdminPage<AdminEntitlement>> {
    return this.http.get<AdminPage<AdminEntitlement>>(this.playerPath(playerId, 'entitlements'), {
      params: this.params({limit: '50'}),
    });
  }

  timeline(playerId: string, scope = 'ALL'): Observable<AdminPage<AdminTimelineItem>> {
    return this.http.get<AdminPage<AdminTimelineItem>>(this.playerPath(playerId, 'timeline'), {
      params: this.params({scope, limit: '50'}),
    });
  }

  private playerPath(playerId: string, resource: string): string {
    return `${environment.platformApiUrl}/admin/players/${encodeURIComponent(playerId)}/${resource}`;
  }

  private params(values: Record<string, string | undefined>): HttpParams {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(values)) if (value) params = params.set(key, value);
    return params;
  }
}
