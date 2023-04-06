import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {StatisticsResponseInterface} from "../interfaces/statistics-response.interface";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable()
export class StatisticsService {
  constructor(
    private http: HttpClient
  ) {
  }

  getStatistics(key: string): Observable<StatisticsResponseInterface> {
    return this.http.get<StatisticsResponseInterface>(`${environment.apiUrl}/statistics/get-statistics/${key}`).pipe(
      catchError((err) => throwError(err))
    )
  }
}
