import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {AdminGameContentService} from './admin-game-content.service';
import {PlatformSessionService} from './platform-session.service';

describe('AdminGameContentService', () => {
  let service: AdminGameContentService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [AdminGameContentService,
      {provide: PlatformSessionService, useValue: {status: () => of({csrfToken: 'csrf'})}}]});
    service = TestBed.inject(AdminGameContentService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('reads governed references and immutable history', () => {
    service.references().subscribe();
    expect(http.expectOne('/api/admin/games/presentation-references').request.method).toBe('GET');
    service.drafts('hunt/legacy').subscribe();
    expect(http.expectOne('/api/admin/games/hunt%2Flegacy/presentation-drafts').request.method).toBe('GET');
  });

  it('creates and publishes through CSRF-protected idempotent commands', () => {
    service.create('hunt', {description: 'Охота', icon: 'crosshair', iconStroked: true,
      featuredStatCodes: ['wins']}).subscribe();
    const draft = http.expectOne('/api/admin/games/hunt/presentation-drafts');
    expect(draft.request.method).toBe('POST');
    expect(draft.request.headers.get('x-csrf-token')).toBe('csrf');
    expect(draft.request.headers.has('idempotency-key')).toBe(true);
    draft.flush({});

    service.publish('draft/id').subscribe();
    const publish = http.expectOne('/api/admin/games/presentation-drafts/draft%2Fid/publish');
    expect(publish.request.method).toBe('POST');
    expect(publish.request.headers.get('x-csrf-token')).toBe('csrf');
    publish.flush({});
  });
});
