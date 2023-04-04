import {Observable, throwError} from "rxjs";
import {CodeResponseInterface} from "../interfaces/code-response.interface";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {VerifyCodeResponseInterface} from "../interfaces/verify-code-response.interface";
import {VerifyCodeRequestInterface} from "../interfaces/verify-code-request.interface";
import {DeleteCodeRequestInterface} from "../interfaces/delete-code-request.interface";
import {RecoverPasswordCodeRequestInterface} from "../interfaces/recover-password-code-request.interface";
import {MiniGameResponseInterface} from "../interfaces/mini-game-response.interface";
import {MiniGameRequestInterface} from "../interfaces/mini-game-request.interface";

@Injectable()
export class MiniGamesService {

  constructor(
    private http: HttpClient
  ) {
  }

  createMiniGame(data: MiniGameRequestInterface): Observable<MiniGameResponseInterface> {
    return this.http.post<MiniGameResponseInterface>(`${environment.apiUrl}/mini-games/create-mini-game`, data)
  }

  getMiniGames(): Observable<MiniGameResponseInterface[]> {
    return this.http.get<MiniGameResponseInterface[]>(`${environment.apiUrl}/mini-games/get-mini-games`)
  }
}
