import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {PlatformAccountService} from './platform-account.service';

describe('PlatformAccountService', () => {
  let service: PlatformAccountService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(PlatformAccountService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('uses only first-party BFF account routes', () => {
    service.register({username: 'Artem', email: 'artem@example.com', password: 'strong-pass'}).subscribe();
    expectPost('/api/accounts/registrations', {username: 'Artem', email: 'artem@example.com', password: 'strong-pass'},
      {operationId: 'registration'});

    service.verifyRegistration('registration', '123456').subscribe();
    expectPost('/api/accounts/registrations/verify', {operationId: 'registration', code: '123456'}, null);

    service.beginPasswordRecovery('artem@example.com').subscribe();
    expectPost('/api/accounts/password-recovery', {email: 'artem@example.com'}, {operationId: 'recovery'});

    service.verifyPasswordRecovery('recovery', '654321').subscribe();
    expectPost('/api/accounts/password-recovery/verify', {operationId: 'recovery', code: '654321'}, null);

    service.resetPassword('replacement-pass').subscribe();
    expectPost('/api/accounts/password-recovery/reset', {password: 'replacement-pass'}, null);
  });

  function expectPost(url: string, body: object, response: object | null): void {
    const request = http.expectOne(url);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(body);
    request.flush(response);
  }
});
