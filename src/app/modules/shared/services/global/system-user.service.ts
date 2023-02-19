import {Injectable} from '@angular/core'
import {Router} from '@angular/router';
import {AppStore} from "../../../../store/app.store";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class SystemUserService {
  constructor(
    private cookieService: CookieService,
    private appStore: AppStore,
    private router: Router,
  ) {
  }

  getAccessToken = (): string => this.cookieService.get('accessToken');
  getRefreshToken = (): string => this.cookieService.get('refreshToken');

  removeAccessToken = () => this.cookieService.delete('accessToken', '/');
  removeRefreshToken = () => this.cookieService.delete('refreshToken', '/');

  logout(b: boolean = true) {
    this.appStore.setUser(null);
    this.appStore.setIsLogged(false);
    this.removeRefreshToken()
    this.removeAccessToken()
    localStorage.clear();
    if (b) this.router.navigate(['/auth'])
  }
}
