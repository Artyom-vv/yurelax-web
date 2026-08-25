import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

export interface AccountOperation { operationId: string }

@Injectable({providedIn: 'root'})
export class PlatformAccountService {
  constructor(private readonly http: HttpClient) {}

  register(input: {username: string; email: string; password: string}): Observable<AccountOperation> {
    return this.http.post<AccountOperation>(`${environment.platformApiUrl}/accounts/registrations`, input);
  }

  verifyRegistration(operationId: string, code: string): Observable<void> {
    return this.http.post<void>(`${environment.platformApiUrl}/accounts/registrations/verify`, {operationId, code});
  }

  beginPasswordRecovery(email: string): Observable<AccountOperation> {
    return this.http.post<AccountOperation>(`${environment.platformApiUrl}/accounts/password-recovery`, {email});
  }

  verifyPasswordRecovery(operationId: string, code: string): Observable<void> {
    return this.http.post<void>(`${environment.platformApiUrl}/accounts/password-recovery/verify`, {operationId, code});
  }

  resetPassword(password: string): Observable<void> {
    return this.http.post<void>(`${environment.platformApiUrl}/accounts/password-recovery/reset`, {password});
  }
}
