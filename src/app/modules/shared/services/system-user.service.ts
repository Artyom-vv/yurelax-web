import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppStore} from '../../../store/app.store';
import {PersistenceService} from './persistence.service';

@Injectable()
export class SystemUserService {
  constructor(
    private readonly appStore: AppStore,
    private readonly router: Router,
    private readonly persistence: PersistenceService,
  ) {}

  logout(navigate = true): void {
    this.persistence.remove('user');
    this.appStore.setUser(null);
    this.appStore.setIsLogged(false);
    if (navigate) this.router.navigate(['/auth']);
  }
}
