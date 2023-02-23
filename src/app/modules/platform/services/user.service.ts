import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) {
  }

  checkUserExists(login: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/user/check-user-exists/${login}`).pipe(
      catchError((err) => throwError(err.error))
    )
  }
}
