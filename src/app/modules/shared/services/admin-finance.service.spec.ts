import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {PlatformSessionService} from './platform-session.service';
import {AdminFinanceService} from './admin-finance.service';

describe('AdminFinanceService', () => {
  let service: AdminFinanceService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule],providers:[AdminFinanceService,
      {provide:PlatformSessionService,useValue:{status:()=>of({csrfToken:'csrf'})}}]});
    service = TestBed.inject(AdminFinanceService); http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('uses the explicit approval queue and protected mutations', () => {
    service.list('PENDING').subscribe();
    http.expectOne('/api/admin/economy/approval-requests?status=PENDING&limit=50').flush({items:[],page:{}});

    service.create({kind:'ADMIN_ADJUSTMENT',playerId:'player/id',currencyCode:'GEMS',amount:'100',reasonCode:'SUPPORT'}).subscribe();
    const create = http.expectOne('/api/admin/economy/approval-requests');
    expect(create.request.body).toEqual({kind:'ADMIN_ADJUSTMENT',playerId:'player/id',currencyCode:'GEMS',amount:'100',reasonCode:'SUPPORT'});
    expect(create.request.headers.get('x-csrf-token')).toBe('csrf'); create.flush({});

    service.approve('request/id').subscribe();
    const approve = http.expectOne('/api/admin/economy/approval-requests/request%2Fid/approve');
    expect(approve.request.headers.get('idempotency-key')).toMatch(/^[0-9a-f-]{36}$/); approve.flush({});

    service.reject('request/id','ошибка обращения').subscribe();
    const reject = http.expectOne('/api/admin/economy/approval-requests/request%2Fid/reject');
    expect(reject.request.body).toEqual({reason:'ошибка обращения'}); reject.flush({});
  });
});
