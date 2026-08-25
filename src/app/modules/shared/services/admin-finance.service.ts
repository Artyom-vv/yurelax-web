import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {PlatformSessionService} from './platform-session.service';

export type FinancialApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXECUTED' | 'EXPIRED';
export interface FinancialAdjustment {
  kind: 'ADMIN_ADJUSTMENT'; playerId: string; currencyCode: string; amount: string; reasonCode: string;
}
export interface FinancialApproval {
  approvalRequestId: string; status: FinancialApprovalStatus; operation: FinancialAdjustment | Record<string, unknown>;
  requestedBy: string; requestedAt: string; approvedBy?: string; decidedAt?: string;
  rejectionReason?: string; executedTransactionIds?: string[];
}
export interface FinancialApprovalPage {
  items: FinancialApproval[]; page: {nextCursor: string | null; hasMore: boolean};
}

@Injectable()
export class AdminFinanceService {
  constructor(private readonly http: HttpClient, private readonly session: PlatformSessionService) {}

  list(status?: FinancialApprovalStatus): Observable<FinancialApprovalPage> {
    const params = status ? new HttpParams().set('status', status).set('limit', '50') : new HttpParams().set('limit', '50');
    return this.http.get<FinancialApprovalPage>(`${environment.platformApiUrl}/admin/economy/approval-requests`, {params});
  }

  create(input: FinancialAdjustment): Observable<unknown> {
    return this.mutation('/admin/economy/approval-requests', input);
  }

  approve(id: string): Observable<FinancialApproval> {
    return this.mutation(`/admin/economy/approval-requests/${encodeURIComponent(id)}/approve`, null);
  }

  reject(id: string, reason: string): Observable<FinancialApproval> {
    return this.mutation(`/admin/economy/approval-requests/${encodeURIComponent(id)}/reject`, {reason});
  }

  private mutation<T>(path: string, body: unknown): Observable<T> {
    return this.session.status().pipe(switchMap(status => this.http.post<T>(
      `${environment.platformApiUrl}${path}`, body, {headers: {
        'x-csrf-token': status.csrfToken ?? '', 'idempotency-key': crypto.randomUUID(),
      }}
    )));
  }
}
