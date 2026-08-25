import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {AdminAuditService} from './admin-audit.service';

describe('AdminAuditService', () => {
  it('forwards only populated audit filters', () => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [AdminAuditService]});
    const api = TestBed.inject(AdminAuditService);
    const http = TestBed.inject(HttpTestingController);
    api.list({action: 'commerce.entitlement.revoked', resourceId: 'entitlement-id', actorId: undefined}).subscribe();
    http.expectOne('/api/admin/audit-log?limit=50&action=commerce.entitlement.revoked&resourceId=entitlement-id')
      .flush({items: [], page: {}});
    http.verify();
  });
});
