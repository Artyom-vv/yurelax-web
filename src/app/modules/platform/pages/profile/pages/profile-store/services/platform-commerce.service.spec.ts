import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {PlatformSessionService} from '../../../../../../shared/services/platform-session.service';
import {PlatformCommerceService} from './platform-commerce.service';

describe('PlatformCommerceService', () => {
  let service: PlatformCommerceService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PlatformCommerceService,
        {provide: PlatformSessionService, useValue: {status: () => of({authenticated: true, csrfToken: 'csrf'})}},
      ]
    });
    service = TestBed.inject(PlatformCommerceService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('reads the personalized storefront with contract filters', () => {
    service.storefront('hunt', 'GEMS').subscribe();
    const request = http.expectOne('/api/storefront?gameCode=hunt&currencyCode=GEMS');
    expect(request.request.method).toBe('GET');
    request.flush({items: []});
  });

  it('reads wallets owned by the authenticated session', () => {
    service.wallets().subscribe();
    const request = http.expectOne('/api/me/wallets');
    expect(request.request.method).toBe('GET');
    expect(request.request.params.keys()).toEqual([]);
    request.flush({items: []});
  });

  it('reads owner purchases and filtered entitlements', () => {
    service.purchases().subscribe();
    http.expectOne('/api/me/purchases').flush({items: [], page: {nextCursor: null, hasMore: false}});

    service.entitlements('ACTIVE').subscribe();
    const rights = http.expectOne('/api/me/entitlements?status=ACTIVE');
    expect(rights.request.method).toBe('GET');
    rights.flush({items: [], page: {nextCursor: null, hasMore: false}});
  });

  it('activates only an owner entitlement with CSRF and idempotency', () => {
    service.activate('8a5de350-1cd6-489b-bbb2-ddf34830e2a0').subscribe();
    const request = http.expectOne('/api/me/entitlements/8a5de350-1cd6-489b-bbb2-ddf34830e2a0/activations');
    expect(request.request.body).toBeNull();
    expect(request.request.headers.get('x-csrf-token')).toBe('csrf');
    expect(request.request.headers.get('idempotency-key')).toMatch(/^[0-9a-f-]{36}$/);
    request.flush({});
  });

  it('purchases without accepting a browser-owned player id', () => {
    service.purchase('hunt.class.archer', 'GEMS').subscribe();
    const request = http.expectOne('/api/me/purchases');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({offerCode: 'hunt.class.archer', currencyCode: 'GEMS', quantity: '1'});
    expect(request.request.body.playerId).toBeUndefined();
    expect(request.request.headers.get('x-csrf-token')).toBe('csrf');
    expect(request.request.headers.get('idempotency-key')).toMatch(/^[0-9a-f-]{36}$/);
    request.flush({purchase: {}, entitlements: [], replayed: false});
  });
});
