import {Observable, throwError} from "rxjs";
import {CodeResponseInterface} from "../interfaces/code-response.interface";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {VerifyCodeResponseInterface} from "../interfaces/verify-code-response.interface";
import {VerifyCodeRequestInterface} from "../interfaces/verify-code-request.interface";
import {DeleteCodeRequestInterface} from "../interfaces/delete-code-request.interface";

@Injectable()
export class MailerService {

  constructor(
    private http: HttpClient
  ) {
  }

  createCode(): Observable<CodeResponseInterface> {
    return this.http.post<CodeResponseInterface>(`${environment.apiUrl}/mailer/create-code`, null).pipe(catchError((err) => throwError(err)))
  }
  verifyCode(data: VerifyCodeRequestInterface): Observable<VerifyCodeResponseInterface> {
    return this.http.post<VerifyCodeResponseInterface>(`${environment.apiUrl}/mailer/verify-code`, data).pipe(catchError((err) => throwError(err)))
  }
  deleteCode(data: DeleteCodeRequestInterface): Observable<CodeResponseInterface> {
    return this.http.delete<CodeResponseInterface>(`${environment.apiUrl}/mailer/delete-code`, {
      body: data
    }).pipe(catchError((err) => throwError(err)))
  }
}
