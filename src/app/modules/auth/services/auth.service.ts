import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError, of, tap} from "rxjs";
import {UserRes} from "../../platform/interfaces/user.interface";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {LoginRequestInterface} from "../interfaces/login-request.interface";
import {LoginRes} from "../interfaces/login.res";
import {RegisterRequestInterface} from "../interfaces/register-request.interface";
import {RegisterRes} from "../interfaces/register.res";
import {TokensResponseInterface} from "../interfaces/tokens-response.interface";
import {PersistenceService} from "../../shared/services/persistence.service";
import {AppStore} from "../../../store/app.store";
import {CookieService} from "ngx-cookie-service";
import {JwtMaResponseInterface} from "../interfaces/jwt-ma-response.interface";
import {JwtMaAuthResponseInterface} from "../interfaces/jwt-ma-auth-response.interface";
import {GetMeRes} from "../interfaces/get-me.res";
import {RecoverPasswordRequestInterface} from "../interfaces/recover-password-request.interface";
import {RecoverPasswordResponseInterface} from "../interfaces/recover-password-response.interface";

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService,
    private cookieService: CookieService,
    private appStore: AppStore,
  ) {
  }

  deleteCookies() {
    this.cookieService.delete('accessToken', '/')
    this.cookieService.delete('refreshToken', '/')
  }

  saveCookies(tokens: TokensResponseInterface) {
    this.cookieService.set('accessToken', tokens.accessToken, {
      path: '/'
    })
    this.cookieService.set('refreshToken', tokens.refreshToken, {
      path: '/'
    })
  }

  saveUserData(user: UserRes) {
    this.persistenceService.set('user', user)
    this.appStore.setUser(user);
  }

  saveData(res: LoginRes | RegisterRes): void {
    const {tokens, user} = res;
    this.saveCookies(tokens)
    this.saveUserData(user)
  }

  login(data: LoginRequestInterface): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${environment.apiUrl}/auth/login`, data).pipe(
      tap((res) => {
        this.saveData(res)
        this.appStore.setIsLogged(true);
      }),
      catchError((err) => throwError(err))
    )
  }

  adminLogin(data: LoginRequestInterface): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${environment.apiUrl}/auth/login`, data).pipe(
      catchError((err) => throwError(err))
    )
  }

  register(data: RegisterRequestInterface): Observable<RegisterRes> {
    return this.http.post<RegisterRes>(`${environment.apiUrl}/auth/register`, data).pipe(
      tap((res) => {
        this.saveData(res)
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    )
  }

  recoverPassword(data: RecoverPasswordRequestInterface): Observable<RecoverPasswordResponseInterface> {
    return this.http.post<RegisterRes>(`${environment.apiUrl}/auth/recover-password`, data).pipe(
      catchError((err) => {
        throw new Error(err.message);
      })
    )
  }

  kickWaitingPlayer(login: string): Observable<any> {
    return this.http.post(`${environment.javaApiUrl}/auth/kick-waiting-player`, {login}).pipe(catchError((err) => throwError(err)))
  }

  logoutFromAllDevices(): Observable<any> {
    return of(false)
  }

  refreshToken(refreshToken: string): Observable<TokensResponseInterface> {
    return this.http.post<TokensResponseInterface>(`${environment.apiUrl}/auth/refresh-token`, {refreshToken}, {headers: {'Anonymous': 'true'}}).pipe(
      tap((tokens) => {
        this.saveCookies(tokens)
      }),
      catchError((err) => {
        this.deleteCookies();
        throw new Error(err.error.message);
      })
    )
  }

  jwtMaAuth(login: string): Observable<JwtMaAuthResponseInterface> {
    return this.http.post<JwtMaAuthResponseInterface>(`${environment.apiUrl}/auth/jwt-ma-auth`, {login}).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  jwtMa(jwt: string): Observable<JwtMaResponseInterface> {
    return this.http.post<JwtMaResponseInterface>(`${environment.apiUrl}/auth/jwt-ma`, {jwt}).pipe(
      catchError((err) => throwError(err.error))
    )
  }

  getMe(): Observable<GetMeRes> {
    return this.http.get<GetMeRes>(`${environment.apiUrl}/auth/get-me`).pipe(
      tap((res) => {
        this.saveUserData(res)
      }),
      catchError((err) => throwError(err))
    )
  }

  logout(): Observable<UserRes> {
    return this.http.get<UserRes>(`${environment.apiUrl}/auth/logout`).pipe(
      catchError((err) => throwError(err))
    )
  }

}
