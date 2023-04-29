import {Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MiniGameResponseInterface} from "../interfaces/mini-game-response.interface";
import {MiniGameRequestInterface} from "../interfaces/mini-game-request.interface";
import {catchError} from "rxjs/operators";

@Injectable()
export class MiniGamesService {

  constructor(
    private http: HttpClient
  ) {
  }

  createMiniGame(data: MiniGameRequestInterface): Observable<MiniGameResponseInterface> {
    return this.http.post<MiniGameResponseInterface>(`${environment.apiUrl}/mini-games/create-mini-game`, data)
  }

  updateMiniGame(data: MiniGameRequestInterface): Observable<MiniGameResponseInterface> {
    return this.http.patch<MiniGameResponseInterface>(`${environment.apiUrl}/mini-games/update-mini-game`, data)
  }

  getMiniGames(): Observable<MiniGameResponseInterface[]> {
    return this.http.get<MiniGameResponseInterface[]>(`${environment.apiUrl}/mini-games/get-mini-games`)
  }

  checkMiniGameExists(miniGameKey: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/statistics/check-mini-game-exists/${miniGameKey}`).pipe(
      catchError((err) => throwError(err))
    )
  }
}
