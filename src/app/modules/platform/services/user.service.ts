import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {first, map, Observable, switchMap, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {CheckUserExistsResponseInterface} from "../interfaces/check-user-exists-response.interface";
import {CheckUserExistsRequestInterface} from "../interfaces/check-user-exists-request.interface";
import {UserInfoInterface} from "../interfaces/user-info.interface";
import {GetUserOnlineResponseInterface} from "../interfaces/get-user-online-response.interface";
import {UserResponseInterface} from "../interfaces/user.interface";
import {AuthService} from "../../auth/services/auth.service";
import {AppStore} from "../../../store/app.store";
import {GetUserOnlineRequestInterface} from "../interfaces/get-user-online-request.interface";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private appStore: AppStore
  ) {
  }

  getUser(userId: string): Observable<UserResponseInterface> {
    return this.http.get<UserResponseInterface>(`${environment.apiUrl}/user/get-user/${userId}`).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  getUserInfo(userId: string): Observable<UserInfoInterface> {
    return this.http.get<UserInfoInterface>(`${environment.apiUrl}/user-info/get-info/${userId}`).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  getUserOnline(data: GetUserOnlineRequestInterface): Observable<GetUserOnlineResponseInterface> {
    return this.http.post<GetUserOnlineResponseInterface>(`${environment.apiUrl}/shared/ping-player`, data).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  checkUserExists(data: CheckUserExistsRequestInterface): Observable<CheckUserExistsResponseInterface> {
    return this.http.post<CheckUserExistsResponseInterface>(`${environment.apiUrl}/user/check-user-exists`, data).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  setEmailConfirmed(): Observable<UserResponseInterface> {
    return this.http.post<UserResponseInterface>(`${environment.apiUrl}/user/set-email-confirmed`, null).pipe(
      switchMap((updatedUser) => this.appStore.user$.pipe(first(),map((userStore) => ({updatedUser, userStore})))),
      map(({userStore, updatedUser}) => {
        if (userStore) this.authService.saveUserData({
          ...userStore,
          user: updatedUser
        })
        return updatedUser
      }),
      catchError((err) => throwError(err.error))
    )
  }
}
