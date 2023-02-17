import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersistenceService} from "./modules/shared/services/global/persistence.service";
import {AppStore} from "./store/app.store";
import {SystemUserService} from "./modules/shared/services/global/system-user.service";
import {filter, Subscription, switchMap, tap} from "rxjs";
import {AuthService} from "./modules/auth/services/auth.service";
import {catchError} from "rxjs/operators";
@Component({
  selector: 'yrx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private persistenceService: PersistenceService,
    private appStore: AppStore,
    private systemUser: SystemUserService,
    private authService: AuthService
  ) {
  }

  private subscriptions: Subscription[] = []

  ngOnInit() {
    const user = this.persistenceService.get('user');
    if (user) {
      this.appStore.setUser(user)
    }
    this.subscriptions.push(
      this.authService.getMe().pipe(
        catchError((err) => {
          throw new Error(err)
        })
      ).subscribe()
    )
    this.subscriptions.push(
      this.appStore.isExit$.pipe(
        filter(isExit => isExit),
        switchMap(() => this.authService.logout()),
        tap(() => {
          this.systemUser.logout();
          this.appStore.setIsExit(false);
        })).subscribe()
    )
    this.appStore.setNavigation([
      {link: '/platform', name: 'О проекте'},
      {link: '/platform/wiki', name: 'Вики'},
      {link: '/platform/store', name: 'Магазин'},
      {link: '/platform/games', name: 'Мини-игры'},
    ])

    this.appStore.setSocials([
      {link: 'https://vk.com/yurelax', name: 'Вконтакте', icon: 'vk'},
      {link: 'https://discord.gg/xTWx7T4y6W', name: 'Дискорд', icon: 'dc'},
      {link: '', name: 'Телеграм', icon: 'tg'},
    ])
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
