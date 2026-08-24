import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../../../../../../../environments/environment';
import {PlatformSessionService} from '../../../../../../shared/services/platform-session.service';
import {
  CommercePurchaseResult,
  CommerceStorefront,
  PlayerWalletPage
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
