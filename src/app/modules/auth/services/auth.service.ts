import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable, throwError, of, tap} from "rxjs";
import {UserRes} from "../../platform/interfaces/user.interface";
import {environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";
import {PersistenceService} from "../../shared/services/persistence.service";
import {AppStore} from "../../../store/app.store";
import {CookieService} from "ngx-cookie-service";
import {
  GetMeRes,
  LoginReq,
  LoginRes, RecoverPasswordReq, RecoverPasswordRes,
  RegisterReq,
  RegisterRes,
  TokensResponseInterface
} from "../interfaces/auth.interface";

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

  login(data: LoginReq): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${environment.apiUrl}/auth/login`, data).pipe(
      tap((res) => {
        this.saveData(res)
        this.appStore.setIsLogged(true);
      })
    )
  }

  adminLogin(data: LoginReq): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${environment.apiUrl}/auth/login`, data)
  }

  register(data: RegisterReq): Observable<RegisterRes> {
    return this.http.post<RegisterRes>(`${environment.apiUrl}/auth/register`, data).pipe(
      tap((res) => {
        this.saveData(res)
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    )
  }

  recoverPassword(data: RecoverPasswordReq): Observable<RecoverPasswordRes> {
    return this.http.post<RegisterRes>(`${environment.apiUrl}/auth/recover-password`, data).pipe(
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

  minecraftAuth(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/auth/minecraft/${token}`, null)
  }

  getMe(): Observable<GetMeRes> {
    return this.http.get<GetMeRes>(`${environment.apiUrl}/auth/get-me`).pipe(
      tap((res) => {
        this.saveUserData(res)
      })
    )
  }

  logout() {
    return this.http.get<UserRes>(`${environment.apiUrl}/auth/logout`)
  }

}
