import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {PlatformSessionService} from './platform-session.service';

describe('PlatformSessionService', () => {
  let service: PlatformSessionService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(PlatformSessionService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('keeps OIDC credentials server-side and caches only session state', () => {
    service.status().subscribe(status => expect(status).toEqual({authenticated: true, csrfToken: 'csrf'}));
    http.expectOne('/api/session').flush({authenticated: true, csrfToken: 'csrf'});

    service.status().subscribe(status => expect(status.authenticated).toBe(true));
    http.expectNone('/api/session');
  });

  it('uses the synchronizer token for logout', () => {
    service.status().subscribe();
    http.expectOne('/api/session').flush({authenticated: true, csrfToken: 'csrf'});

    service.logout().subscribe();
    const request = http.expectOne('/api/session/logout');
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('x-csrf-token')).toBe('csrf');
    request.flush(null);
  });

  it('reads only the server-verified access context', () => {
    service.access().subscribe(access => expect(access.roles).toEqual(['CONTENT_ADMIN']));
    const request = http.expectOne('/api/me/access');
    expect(request.request.method).toBe('GET');
    request.flush({roles: ['CONTENT_ADMIN'], scopes: ['content:read']});
  });
});
