import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {StatisticsResponseInterface} from "../interfaces/statistics-response.interface";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {CreateStatisticsRequestInterface} from "../interfaces/create-statistics-request.interface";
import {StatisticsListRequestInterface} from "../interfaces/statistics-list-request.interface";

@Injectable()
export class StatisticsService {
  constructor(
    private http: HttpClient
  ) {
  }

  checkStatisticsExists(key: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/statistics/check-statistics-exists/${key}`).pipe(
      catchError((err) => throwError(err))
    )
  }

  deleteStatistics(key: string): Observable<StatisticsResponseInterface> {
    return this.http.delete<StatisticsResponseInterface>(`${environment.apiUrl}/statistics/delete-statistics/${key}`).pipe(
      catchError((err) => throwError(err))
    )
  }


  getStatistics(key: string): Observable<StatisticsResponseInterface> {
    return this.http.get<StatisticsResponseInterface>(`${environment.apiUrl}/statistics/get-statistics/${key}`).pipe(
      catchError((err) => throwError(err))
    )
  }

  getStatisticsList(data: StatisticsListRequestInterface): Observable<StatisticsResponseInterface[]> {
    return this.http.post<StatisticsResponseInterface[]>(`${environment.apiUrl}/statistics/list`, data).pipe(
      catchError((err) => throwError(err))
    )
  }

  createStatistics(data: CreateStatisticsRequestInterface): Observable<StatisticsResponseInterface> {
    return this.http.post<StatisticsResponseInterface>(`${environment.apiUrl}/statistics/create-statistics`, data).pipe(
      catchError((err) => throwError(err))
    )
  }

  updateStatistics(data: CreateStatisticsRequestInterface): Observable<StatisticsResponseInterface> {
    return this.http.patch<StatisticsResponseInterface>(`${environment.apiUrl}/statistics/update-statistics`, data).pipe(
      catchError((err) => throwError(err))
    )
  }
}
