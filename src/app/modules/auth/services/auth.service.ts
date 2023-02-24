import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError, of, tap} from "rxjs";
import {UserResponseInterface} from "../../platform/interfaces/user.interface";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {LoginRequestInterface} from "../interfaces/login-request.interface";
import {LoginResponseInterface} from "../interfaces/login-response.interface";
import {RegisterRequestInterface} from "../interfaces/register-request.interface";
import {RegisterResponseInterface} from "../interfaces/register-response.interface";
import {TokensResponseInterface} from "../interfaces/tokens-response.interface";
import {PersistenceService} from "../../shared/services/global/persistence.service";
import {AppStore} from "../../../store/app.store";
import {CookieService} from "ngx-cookie-service";
import {JwtMaResponseInterface} from "../interfaces/jwt-ma-response.interface";
import {JwtMaAuthResponseInterface} from "../interfaces/jwt-ma-auth-response.interface";
import {SystemUserService} from "../../shared/services/global/system-user.service";

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService,
    private cookieService: CookieService,
    private appStore: AppStore,
    private systemUser: SystemUserService
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

  saveUserData(user: UserResponseInterface) {
    this.persistenceService.set('user', user)
    this.appStore.setUser(user);
  }

  saveData(user: LoginResponseInterface | RegisterResponseInterface): void {
    this.saveCookies(user.tokens)
    this.saveUserData(user.user)
  }

  login(data: LoginRequestInterface): Observable<LoginResponseInterface> {
    return this.http.post<LoginResponseInterface>(`${environment.apiUrl}/auth/login`, data).pipe(
      tap((res) => {
        this.saveData(res)
        this.appStore.setIsLogged(true);
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    )
  }

  register(data: RegisterRequestInterface): Observable<RegisterResponseInterface> {
    return this.http.post<RegisterResponseInterface>(`${environment.apiUrl}/auth/register`, data).pipe(
      tap((res) => {
        this.saveData(res)
        this.appStore.setIsLogged(true);
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    )
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

  getMe(): Observable<UserResponseInterface> {
    return this.http.get<UserResponseInterface>(`${environment.apiUrl}/auth/get-me`).pipe(
      tap((res) => {
        this.saveUserData(res)
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    )
  }

  logout(): Observable<UserResponseInterface> {
    return this.http.get<UserResponseInterface>(`${environment.apiUrl}/auth/logout`).pipe(
      catchError((err) => {
        throw new Error(err.message);
      })
    )
  }

}
