import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {PlatformSessionService} from './platform-session.service';

export interface AdminCommerceGrant {
  ordinal: number;
  providerCode: string;
  grantKey: string;
  gameCode: string | null;
  deliveryMode: 'ENTITLEMENT' | 'FULFILLMENT';
  ownershipPolicy: 'DENY_DUPLICATE' | 'EXTEND' | 'REPLACE' | 'STACK';
  lifetime: {kind: string; durationSeconds?: number; startsAt?: string; expiresAt?: string};
  activationPolicy: unknown | null;
}

export interface AdminCommerceProductRevision {
  id: string;
  productCode: string;
  name: string;
  description: string;
  version: number;
  kind: string;
  purchasePolicy: string;
  grants: AdminCommerceGrant[];
  publishedAt: string;
}

export interface AdminCommerceOfferRevision {
  id: string;
  code: string;
  version: number;
  productCode: string;
  productVersion: number;
  gameCode: string | null;
  effectiveFrom: string;
  effectiveUntil: string | null;
  requirement: unknown | null;
  prices: {currencyCode: string; amount: string}[];
  publishedAt: string;
  retiredAt: string | null;
  retirementReason: string | null;
}

export interface AdminCommercePage<T> {
  items: T[];
  page: {nextCursor: string | null; hasMore: boolean};
}

export interface CommerceCurrencyReference { id: string; code: string; exponent: number; active: boolean }
export interface CommerceGameReference { id: string; code: string; name: string; active: boolean; createdAt: string }
export interface CommerceStatisticReference {
  id: string; code: string; valueKind: string; aggregationKind: string; unit?: string;
  allowNegative: boolean; active: boolean;
}
export interface CommerceProviderReference { id: string; code: string; active: boolean }
export interface CommerceCapabilityReference {
  id: string;
  providerCode: string;
  grantKey: string;
  name: string;
  description: string;
  gameCode: string | null;
  deliveryMode: CommerceDeliveryMode;
  payloadSchema: unknown;
  active: boolean;
  createdAt: string;
}
export interface CommerceProgressionReference {
  id: string; code: string; name: string; inputStatCode: string; activeRulesetVersions: string[];
}
export interface AdminCommerceReferences {
  currencies: CommerceCurrencyReference[];
  games: CommerceGameReference[];
  statistics: CommerceStatisticReference[];
  providers: CommerceProviderReference[];
  progressions: CommerceProgressionReference[];
  capabilities: CommerceCapabilityReference[];
}

export type CommerceFulfillmentStatus = 'PENDING' | 'CLAIMED' | 'FULFILLED' | 'FAILED';
export type CommerceFulfillmentHealthState = 'HEALTHY' | 'DEGRADED' | 'STALLED';

export interface CommerceFulfillmentInspection {
  id: string;
  entitlementId: string;
  playerId: string;
  productCode: string;
  providerCode: string;
  fulfillmentKey: string;
  status: CommerceFulfillmentStatus;
  attempts: number;
  leaseOwner: string | null;
  leaseUntil: string | null;
  resultReference: string | null;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
  ageSeconds: number;
  stale: boolean;
}

export interface CommerceFulfillmentHealth {
  providerCode: string;
  state: CommerceFulfillmentHealthState;
  pending: number;
  claimed: number;
  failed: number;
  fulfilled: number;
  outstanding: number;
  stale: number;
  maximumAttempts: number;
  oldestOutstandingAt: string | null;
  oldestOutstandingAgeSeconds: number | null;
}

export interface CommerceFulfillmentInspectionResult {
  items: CommerceFulfillmentInspection[];
  health: CommerceFulfillmentHealth;
}

export type CommerceProductKind = 'PERMISSION' | 'ITEM' | 'REWARD_ACCESS' | 'CUSTOM';
export type CommerceDeliveryMode = 'ENTITLEMENT' | 'FULFILLMENT';
export type CommerceOwnershipPolicy = 'DENY_DUPLICATE' | 'EXTEND' | 'REPLACE' | 'STACK';

export interface PublishCommerceGrant {
  providerCode: string;
  grantKey: string;
  gameCode: string | null;
  deliveryMode: CommerceDeliveryMode;
  ownershipPolicy: CommerceOwnershipPolicy;
  lifetime: {kind: 'PERMANENT'} | {kind: 'FIXED_DURATION'; durationSeconds: number}
    | {kind: 'FIXED_WINDOW'; startsAt: string; expiresAt: string};
  activationPolicy: null | {
    durationSeconds: number;
    lifetimeMaximumActivations: number | null;
    period: null | {kind: 'FIXED_UTC_WINDOW'; windowSeconds: number; maximumActivations: number};
  };
  payload: unknown;
}

export interface PublishCommerceProduct {
  code: string;
  name: string;
  description: string;
  version: number;
  kind: CommerceProductKind;
  grants: PublishCommerceGrant[];
}

export type CommerceRequirement =
  | {kind: 'ALL' | 'ANY'; items: CommerceRequirement[]}
  | {kind: 'NOT'; item: CommerceRequirement}
  | {kind: 'PROGRESSION_LEVEL'; progressionCode: string; minimumLevel: number}
  | {kind: 'STAT_THRESHOLD'; statCode: string; gameCode: string | null; minimum: string}
  | {kind: 'GRANT_OWNED'; providerCode: string; grantKey: string; gameCode: string | null}
  | {kind: 'PURCHASE_COUNT_LIMIT'; offerCode: string; maximum: number};

export interface PublishCommerceOffer {
  code: string;
  version: number;
  productCode: string;
  productVersion: number;
  gameCode: string | null;
  effectiveFrom: string;
  effectiveUntil: string | null;
  requirement: CommerceRequirement | null;
  prices: {currencyCode: string; amount: string}[];
}

@Injectable()
export class AdminCommerceService {
  constructor(
    private readonly http: HttpClient,
    private readonly session: PlatformSessionService,
  ) {}

  products(productCode?: string): Observable<AdminCommercePage<AdminCommerceProductRevision>> {
    const params = productCode ? new HttpParams().set('productCode', productCode) : undefined;
    return this.http.get<AdminCommercePage<AdminCommerceProductRevision>>(
      `${environment.platformApiUrl}/admin/commerce/products`, {params},
    );
  }

  offers(offerCode?: string): Observable<AdminCommercePage<AdminCommerceOfferRevision>> {
    const params = offerCode ? new HttpParams().set('offerCode', offerCode) : undefined;
    return this.http.get<AdminCommercePage<AdminCommerceOfferRevision>>(
      `${environment.platformApiUrl}/admin/commerce/offers`, {params},
    );
  }

  references(): Observable<AdminCommerceReferences> {
    return this.http.get<AdminCommerceReferences>(`${environment.platformApiUrl}/admin/commerce/references`);
  }

  fulfillments(providerCode: string, status?: CommerceFulfillmentStatus): Observable<CommerceFulfillmentInspectionResult> {
    let params = new HttpParams().set('providerCode', providerCode).set('limit', '50');
    if (status) params = params.set('status', status);
    return this.http.get<CommerceFulfillmentInspectionResult>(
      `${environment.platformApiUrl}/admin/commerce/fulfillments`, {params},
    );
  }

  publishProduct(input: PublishCommerceProduct): Observable<AdminCommerceProductRevision> {
    return this.mutation<AdminCommerceProductRevision>('/admin/commerce/products', input);
  }

  publishOffer(input: PublishCommerceOffer): Observable<AdminCommerceOfferRevision> {
    return this.mutation<AdminCommerceOfferRevision>('/admin/commerce/offers', input);
  }

  retireOffer(offerId: string, reason: string): Observable<AdminCommerceOfferRevision> {
    return this.mutation<AdminCommerceOfferRevision>(
      `/admin/commerce/offers/${encodeURIComponent(offerId)}/retirement`, {reason},
    );
  }

  private mutation<T>(path: string, body: unknown): Observable<T> {
    return this.session.status().pipe(
      switchMap(status => this.http.post<T>(`${environment.platformApiUrl}${path}`, body, {headers: {
        'x-csrf-token': status.csrfToken ?? '',
        'idempotency-key': crypto.randomUUID(),
      }}))
    );
  }
}
