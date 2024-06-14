import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {first, map, Observable, switchMap, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {CheckUserExistsResponseInterface} from "../interfaces/check-user-exists-response.interface";
import {CheckUserExistsRequestInterface} from "../interfaces/check-user-exists-request.interface";
import {UserInfo} from "../interfaces/user.info";
import {GetUserOnlineResponseInterface} from "../interfaces/get-user-online-response.interface";
import {UserRes} from "../interfaces/user.interface";
import {AuthService} from "../../auth/services/auth.service";
import {AppStore} from "../../../store/app.store";
import {GetUserOnlineReq} from "../interfaces/get-user-online.req";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private appStore: AppStore
  ) {
  }

  getUser(userId: string): Observable<UserRes> {
    return this.http.get<UserRes>(`${environment.apiUrl}/users/get-user/${userId}`).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  getUserInfo(userId: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.apiUrl}/users-info/get-info/${userId}`).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  getUserOnline(data: GetUserOnlineReq): Observable<GetUserOnlineResponseInterface> {
    return this.http.post<GetUserOnlineResponseInterface>(`${environment.apiUrl}/server/ping-player`, data).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  checkUserExists(data: CheckUserExistsRequestInterface): Observable<CheckUserExistsResponseInterface> {
    return this.http.post<CheckUserExistsResponseInterface>(`${environment.apiUrl}/users/check-user-exists`, data).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  setEmailConfirmed(): Observable<UserRes> {
    return this.http.post<UserRes>(`${environment.apiUrl}/users/set-email-confirmed`, null).pipe(
      switchMap((updatedUser) => this.appStore.user$.pipe(first(),map((userStore) => ({updatedUser, userStore})))),
      map(({userStore, updatedUser}) => {
        if (userStore) this.authService.saveUserData({
          ...userStore,
          ...updatedUser
        })
        return updatedUser
      }),
      catchError((err) => throwError(err.error))
    )
  }
}
