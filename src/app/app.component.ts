import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PersistenceService} from "./modules/shared/services/persistence.service";
import {AppStore} from "./store/app.store";
import {SystemUserService} from "./modules/shared/services/system-user.service";
import {filter, Subscription, switchMap, tap} from "rxjs";
import {AuthService} from "./modules/auth/services/auth.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'yrx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private persistenceService: PersistenceService,
    private appStore: AppStore,
    private systemUser: SystemUserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  @HostListener('window:storage',['$event'])
  public storageUpdate(event: StorageEvent): void {
    if (!event.key) return this.systemUser.logout(true)
    if (event.key === 'user') {
      this.appStore.setUser(JSON.parse(event.newValue!));
      this.appStore.setIsLogged(true)
      this.router.navigate(['/platform'])
    }
  }

  private subscriptions: Subscription[] = []

  ngOnInit() {
    this.systemUser.removeMAToken()
    const user = this.persistenceService.get('user');
    if (user) {
      this.appStore.setUser(user)
    }
    this.dataFields()
    this.appStore.setNavigation([
      {link: '/platform', name: 'О проекте', isLogged: false},
      // {link: '/platform/wiki', name: 'Вики', isLogged: false},
      // {link: '/platform/store', name: 'Магазин', isLogged: true},
      // {link: '/platform/games', name: 'Мини-игры', isLogged: true},
    ])

    this.appStore.setProfileNavigation([
      [
        {isButton: false, link: '/platform/profile/home', name: 'Главная', icon: 'home', iconStroked: true},
        {isButton: false, link: '/platform/profile/wallet', name: 'Кошелек', icon: 'wallet', iconStroked: true},
        // {isButton: false, link: '/platform/profile/store', name: 'Магазин', icon: 'shopping-bag', iconStroked: true},
        // {isButton: false, link: '/platform/profile/games', name: 'Мини-игры', icon: 'box', iconStroked: true},
        // {isButton: false, link: '/platform/profile/referrals', name: 'Реферальная система', icon: 'user-plus', iconStroked: true},
      ],
      // [
      //   {isButton: false, link: '/platform/profile/settings', name: 'Настройка аккаунта', icon: 'settings', iconStroked: true},
      //   {isButton: false, link: '/platform/profile/restrictions', name: 'Баны и предупреждения', icon: 'alert-triangle', iconStroked: true},
      // ],
      [
        {isButton: true, name: 'Выйти со всех устройств', icon: 'laptop', iconStroked: true, callback: () => {this.logoutFromAllDevices()}},
        {isButton: true, name: 'Выйти', icon: 'logout', iconStroked: true, callback: () => {this.appStore.setIsExit(true)}},
      ]
    ])

    this.appStore.setAdminNavigation([
      [
        {isButton: false, link: '/admin/statistics', name: 'Статистика', icon: 'file', iconStroked: true},
        {isButton: false, link: '/admin/mini-games', name: 'Мини-игры', icon: 'joystick', iconStroked: true},
      ],
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

  private logoutFromAllDevices(): void {
    this.subscriptions.push(
      this.authService.logoutFromAllDevices().pipe(
        tap(() => {
          this.appStore.setIsExit(true);
        })
      ).subscribe()
    )
  }

  private dataFields(): void {
    this.subscriptions.push(
      this.authService.getMe().pipe(
        tap(() => {
          this.appStore.setIsLogged(true);
          this.appStore.setPreloading(false);
        }),
        catchError((err) => {
          this.systemUser.logout(false)
          setTimeout(() => {
            this.appStore.setPreloading(false);
          }, 300)
          throw new Error(err.error.message)
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
        }),
        catchError((err) => {
          throw new Error(err)
        })
      ).subscribe()
    )
  }
}
