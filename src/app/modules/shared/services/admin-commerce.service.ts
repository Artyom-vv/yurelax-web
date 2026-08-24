import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

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

@Injectable()
export class AdminCommerceService {
  constructor(private readonly http: HttpClient) {}

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
}
