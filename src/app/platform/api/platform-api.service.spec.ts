import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PlatformApiService } from './platform-api.service';

describe('PlatformApiService', () => {
  let api: PlatformApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(PlatformApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('reads session state without any browser token', () => {
    api.session().subscribe((session) => expect(session).toEqual({ authenticated: true, csrfToken: 'csrf' }));
    const request = http.expectOne('/api/session');
    expect(request.request.headers.has('authorization')).toBe(false);
    request.flush({ authenticated: true, csrfToken: 'csrf' });
  });

  it('loads only owner-safe cabinet routes', () => {
    api.cabinet().subscribe((result) => expect(result.profile.currentName).toBe('Suppick'));
    http.expectOne('/api/me/profile').flush({ playerId: 'player', currentName: 'Suppick', identities: [] });
    http.expectOne('/api/storefront').flush({ items: [] });
    http.expectOne('/api/me/purchases?limit=20').flush({ items: [], page: { nextCursor: null, hasMore: false } });
    http.expectOne('/api/me/entitlements?limit=50').flush({ items: [], page: { nextCursor: null, hasMore: false } });
  });

  it('sends the synchronizer token only for logout', () => {
    api.logout('csrf').subscribe();
    const request = http.expectOne('/api/session/logout');
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('X-CSRF-Token')).toBe('csrf');
    request.flush(null);
  });

  it('creates replay-safe owner mutations without a player identifier', () => {
    api.purchase('csrf', 'hunt.class.shadow', 'GEMS').subscribe();
    const purchase = http.expectOne('/api/me/purchases');
    expect(purchase.request.method).toBe('POST');
    expect(purchase.request.body).toEqual({ offerCode: 'hunt.class.shadow', currencyCode: 'GEMS', quantity: '1' });
    expect(purchase.request.headers.get('X-CSRF-Token')).toBe('csrf');
    expect(purchase.request.headers.get('Idempotency-Key')).toMatch(/^[0-9a-f-]{36}$/);
    expect(purchase.request.body.playerId).toBeUndefined();
    purchase.flush({ replayed: false });

    api.activate('csrf', '7631a7a4-671e-4fdb-824b-51c08874d68c').subscribe();
    const activation = http.expectOne('/api/me/entitlements/7631a7a4-671e-4fdb-824b-51c08874d68c/activations');
    expect(activation.request.method).toBe('POST');
    expect(activation.request.headers.get('X-CSRF-Token')).toBe('csrf');
    expect(activation.request.headers.get('Idempotency-Key')).toMatch(/^[0-9a-f-]{36}$/);
    activation.flush({ replayed: false });
  });
});
