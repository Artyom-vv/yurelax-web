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
});
