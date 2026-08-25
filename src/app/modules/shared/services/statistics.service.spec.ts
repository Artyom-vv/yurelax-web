import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {PlatformSessionService} from './platform-session.service';
import {StatisticsService} from './statistics.service';

describe('StatisticsService platform contracts', () => {
  let service: StatisticsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StatisticsService,
        {provide: PlatformSessionService, useValue: {status: () => of({authenticated: true, csrfToken: 'csrf'})}},
      ]
    });
    service = TestBed.inject(StatisticsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lists immutable statistic definitions through the admin BFF', () => {
    service.list().subscribe();
    const request = http.expectOne('/api/admin/stat-definitions');
    expect(request.request.method).toBe('GET');
    request.flush({items: [], page: {nextCursor: null, hasMore: false}});
  });

  it('creates an exact typed contract with CSRF and idempotency', () => {
    const input = {code: 'hunt.kills', valueKind: 'BIGINT', aggregationKind: 'SUM', allowNegative: false} as const;
    service.create(input).subscribe();
    const request = http.expectOne('/api/admin/stat-definitions');
    expect(request.request.body).toEqual(input);
    expect(request.request.headers.get('x-csrf-token')).toBe('csrf');
    expect(request.request.headers.get('idempotency-key')).toMatch(/^[0-9a-f-]{36}$/);
    request.flush({...input, id: 'id', active: true});
  });

  it('deactivates without exposing a destructive delete operation', () => {
    service.deactivate('stat-id', 'duplicate').subscribe();
    const request = http.expectOne('/api/admin/stat-definitions/stat-id/deactivate');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({reason: 'duplicate'});
    request.flush({});
  });
});
