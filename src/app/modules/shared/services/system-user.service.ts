import {Injectable} from '@angular/core'
import {Router} from '@angular/router';
import {AppStore} from "../../../store/app.store";
import {CookieService} from "ngx-cookie-service";
import {PersistenceService} from "./persistence.service";

@Injectable()
export class SystemUserService {
  constructor(
    private cookieService: CookieService,
    private appStore: AppStore,
    private router: Router,
    private persistenceService: PersistenceService
  ) {
  }

  getMAToken = (): string => this.persistenceService.get('MAToken');
  removeMAToken = () => this.persistenceService.set('MAToken', null);

  getAccessToken = (): string => this.cookieService.get('accessToken');
  getRefreshToken = (): string => this.cookieService.get('refreshToken');

  removeAccessToken = () => this.cookieService.delete('accessToken', '/');
  removeRefreshToken = () => this.cookieService.delete('refreshToken', '/');

  logout(b: boolean = true) {
    this.removeRefreshToken()
    this.removeAccessToken()
    localStorage.clear();
    this.appStore.setUser(null);
    this.appStore.setIsLogged(false);
    if (b) this.router.navigate(['/auth'])
  }
}
