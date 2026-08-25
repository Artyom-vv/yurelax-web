import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {vi} from 'vitest';
import {PlatformGameLinkService} from './platform-game-link.service';
import {PlatformSessionService} from './platform-session.service';

describe('PlatformGameLinkService', () => {
  let service: PlatformGameLinkService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: PlatformSessionService, useValue: {
        status: vi.fn().mockReturnValue(of({authenticated: true, csrfToken: 'csrf-token'})),
      }}],
    });
    service = TestBed.inject(PlatformGameLinkService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('approves the proxy code through the same-origin BFF with CSRF', () => {
    service.approve('AABBCCDDEE').subscribe(profile => expect(profile.currentName).toBe('SuPPick'));

    const request = http.expectOne('/api/me/game-links/AABBCCDDEE/approve');
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('x-csrf-token')).toBe('csrf-token');
    request.flush({playerId: 'player-id', currentName: 'SuPPick', identities: [
      {provider: 'KEYCLOAK'}, {provider: 'MINECRAFT'},
    ]});
  });
});
