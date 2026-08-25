import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../../../../../../../environments/environment';
import {PlatformSessionService} from '../../../../../../shared/services/platform-session.service';
import {
  CommerceEntitlement,
  CommercePurchaseResult,
  CommercePurchase,
  CommerceStorefront,
  CursorPage,
  PlayerWalletPage,
  PlayerWalletTransactionPage
} from '../interfaces/commerce.interface';

@Injectable({providedIn: 'root'})
export class PlatformCommerceService {
  constructor(
    private readonly http: HttpClient,
    private readonly session: PlatformSessionService,
  ) {}

  storefront(gameCode?: string, currencyCode?: string): Observable<CommerceStorefront> {
    let params = new HttpParams();
    if (gameCode) params = params.set('gameCode', gameCode);
    if (currencyCode) params = params.set('currencyCode', currencyCode);
    return this.http.get<CommerceStorefront>(`${environment.platformApiUrl}/storefront`, {params});
  }

  wallets(): Observable<PlayerWalletPage> {
    return this.http.get<PlayerWalletPage>(`${environment.platformApiUrl}/me/wallets`);
  }

  walletTransactions(): Observable<PlayerWalletTransactionPage> {
    return this.http.get<PlayerWalletTransactionPage>(`${environment.platformApiUrl}/me/wallet-transactions`);
  }

  purchases(): Observable<CursorPage<CommercePurchase>> {
    return this.http.get<CursorPage<CommercePurchase>>(`${environment.platformApiUrl}/me/purchases`);
  }

  entitlements(status?: CommerceEntitlement['status']): Observable<CursorPage<CommerceEntitlement>> {
    const params = status ? new HttpParams().set('status', status) : undefined;
    return this.http.get<CursorPage<CommerceEntitlement>>(`${environment.platformApiUrl}/me/entitlements`, {params});
  }

  activate(entitlementId: string): Observable<unknown> {
    return this.session.status().pipe(
      switchMap(status => this.http.post(
        `${environment.platformApiUrl}/me/entitlements/${entitlementId}/activations`,
        null,
        {headers: {
          'x-csrf-token': status.csrfToken ?? '',
          'idempotency-key': crypto.randomUUID(),
        }}
      ))
    );
  }

  purchase(offerCode: string, currencyCode: string): Observable<CommercePurchaseResult> {
    return this.session.status().pipe(
      switchMap(status => this.http.post<CommercePurchaseResult>(
        `${environment.platformApiUrl}/me/purchases`,
        {offerCode, currencyCode, quantity: '1'},
        {headers: {
          'x-csrf-token': status.csrfToken ?? '',
          'idempotency-key': crypto.randomUUID(),
        }}
      ))
    );
  }
}
