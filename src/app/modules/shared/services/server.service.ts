import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {GetOnlineResponseInterface} from "../interfaces/get-online-response.interface";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable()
export class ServerService {
  constructor(
    private http: HttpClient
  ) {
  }

  getOnline(): Observable<GetOnlineResponseInterface> {
    return this.http.get<GetOnlineResponseInterface>(`${environment.apiUrl}/shared/get-server-online`).pipe(
      catchError((err) => throwError(err))
    )
  }
}
