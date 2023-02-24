import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {CheckUserExistsResponseInterface} from "../interfaces/check-user-exists-response.interface";
import {CheckUserExistsRequestInterface} from "../interfaces/check-user-exists-request.interface";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) {
  }

  checkUserExists(data: CheckUserExistsRequestInterface): Observable<CheckUserExistsResponseInterface> {
    return this.http.post<CheckUserExistsResponseInterface>(`${environment.apiUrl}/user/check-user-exists`, data).pipe(
      catchError((err) => throwError(err.error))
    )
  }
}
