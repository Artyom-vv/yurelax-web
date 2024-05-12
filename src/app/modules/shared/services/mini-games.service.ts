import {Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MiniGameResponseInterface} from "../interfaces/old/mini-game-response.interface";
import {MiniGameRequestInterface} from "../interfaces/old/mini-game-request.interface";
import {catchError} from "rxjs/operators";

@Injectable()
export class MiniGamesService {

  constructor(
    private http: HttpClient
  ) {
  }

  getFormData({image, ...data}: MiniGameRequestInterface): FormData {
    const formData: FormData = new FormData()
    formData.append('image', image ? image : JSON.stringify(image))
    formData.append('data', JSON.stringify(data))

    return formData
  }

  createMiniGame(data: MiniGameRequestInterface): Observable<MiniGameResponseInterface> {
    return this.http.post<MiniGameResponseInterface>(`${environment.apiUrl}/mini-games/create-mini-game`, this.getFormData(data)).pipe(
      catchError((err) => throwError(err))
    )
  }

  deleteMiniGame(miniGameId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/mini-games/delete-mini-game/${miniGameId}`).pipe(
      catchError((err) => throwError(err))
    )
  }

  updateMiniGame(data: MiniGameRequestInterface, miniGameKey: string): Observable<MiniGameResponseInterface> {
    return this.http.patch<MiniGameResponseInterface>(`${environment.apiUrl}/mini-games/update-mini-game/${miniGameKey}`, this.getFormData(data)).pipe(
      catchError((err) => throwError(err))
    )
  }

  getMiniGames(): Observable<MiniGameResponseInterface[]> {
    return this.http.get<MiniGameResponseInterface[]>(`${environment.apiUrl}/mini-games/get-mini-games`).pipe(
      catchError((err) => throwError(err))
    )
  }

  checkMiniGameExists(miniGameKey: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/mini-games/check-mini-game-exists/${miniGameKey}`).pipe(
      catchError((err) => throwError(err))
    )
  }
}
