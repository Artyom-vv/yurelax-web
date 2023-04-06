import {Observable, throwError,} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {SetUserStatisticsRequestInterface} from "../interfaces/set-user-statistics-request.interface";
import {UserStatisticsResponseInterface} from "../interfaces/user-statistics-response.interface";
import {GetUserStatisticsRequestInterface} from "../interfaces/get-user-statistics-request.interface";
import {GetTopPlayersRequestInterface} from "../interfaces/get-top-players-request.interface";
import {catchError} from "rxjs/operators";
import {GetTopPlayersItemResponseInterface} from "../interfaces/get-top-players-response.interface";

@Injectable()
export class UserStatisticsService {

  constructor(
    private http: HttpClient
  ) {
  }

  setUserStatistics(data: SetUserStatisticsRequestInterface): Observable<UserStatisticsResponseInterface> {
    return this.http.post<UserStatisticsResponseInterface>(`${environment.apiUrl}/user-statistics/create-and-upd-statistics`, data).pipe(
      catchError((err) => throwError(err))
    )
  }

  getUserStatistics(data: GetUserStatisticsRequestInterface): Observable<UserStatisticsResponseInterface> {
    return this.http.post<UserStatisticsResponseInterface>(`${environment.apiUrl}/user-statistics/get-statistics`, data).pipe(
      catchError((err) => throwError(err))
    )
  }

  getTopPlayers(data: GetTopPlayersRequestInterface): Observable<GetTopPlayersItemResponseInterface[]> {
    return this.http.post<GetTopPlayersItemResponseInterface[]>(`${environment.apiUrl}/user-statistics/get-top-players-statistics`, data).pipe(
      catchError((err) => throwError(err))
    )
  }
}
