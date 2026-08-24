import {Component, HostListener, Inject, NgZone, OnInit, PLATFORM_ID} from '@angular/core';
import {PersistenceService} from "./modules/shared/services/persistence.service";
import {AppStore} from "./store/app.store";
import {SystemUserService} from "./modules/shared/services/system-user.service";
import {filter, finalize, of, switchMap, tap, throwError} from "rxjs";
import {AuthService} from "./modules/auth/services/auth.service";
import {catchError} from "rxjs/operators";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {WikiService} from "./modules/platform/pages/wiki/services/wiki.service";
import {SidebarNavigation} from "./modules/platform/modules/sidebar/interfaces/sidebarNavItem";
import {AdminModule} from "./modules/admin/admin.module";
import {isPlatformBrowser, registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {PlatformSessionService} from './modules/shared/services/platform-session.service';

registerLocaleData(localeRu)

@UntilDestroy()
@Component({
    selector: 'yrx-root',
    imports: [
        AdminModule,
        RouterOutlet
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private persistenceService: PersistenceService,
    private appStore: AppStore,
    private systemUser: SystemUserService,
    private authService: AuthService,
    private router: Router,
    private wikiService: WikiService,
    private ngZone: NgZone,
    private platformSession: PlatformSessionService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const queryParams = this.router.routerState.snapshot.root.queryParams;
      const elementId = queryParams['scrollId'];
      if (elementId) {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.ngZone.run(() => {
              const element = document.getElementById(elementId);
              element?.scrollIntoView({ behavior: 'smooth' });
            });
          }, 200); // увеличь время, если не работает
        });
      }
    });
  }

  scrollToElement(elementId: string): void {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      element?.scrollIntoView({ behavior: 'smooth' });
    })
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          const activeElement: any = document.activeElement;
          const rect = activeElement.getBoundingClientRect();
          const isInView = rect.top <= window.pageYOffset + window.innerHeight && rect.top >= window.pageYOffset;
          const isShiftTab = event.shiftKey;

          console.log(isInView); // For debugging

          if (!isInView || isShiftTab) {

            let targetPosition;
            if (event.shiftKey) {  // Проверяем, нажата ли клавиша Shift
              targetPosition = window.pageYOffset + rect.top - window.innerHeight + rect.height + 20;
            } else {
              targetPosition = window.pageYOffset + rect.top - 20; // 20px offset
            }

            if (!isInView) {
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }
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

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadWikiNavigation();
      const user = this.persistenceService.get('user');
      if (user) this.appStore.setUser(user)
      this.dataFields()
    }
    this.appStore.setNavigation([
      {link: '/platform', name: 'О проекте', isLogged: false},
      {link: '/platform/wiki', name: 'Вики', isLogged: false},
      {link: '/platform/games', name: 'Мини-игры', isLogged: true},
      // {link: '/platform/store', name: 'Магазин', isLogged: true},
    ])

    this.appStore.setProfileNavigation([
      [
        {isButton: false, link: '/platform/profile/home', name: 'Главная', icon: 'home', iconStroked: true},
        {isButton: false, link: '/platform/profile/wallet', name: 'Кошелек', icon: 'wallet', iconStroked: true},
        {isButton: false, link: '/platform/profile/store', name: 'Магазин', icon: 'shopping-bag', iconStroked: true},
        {isButton: false, link: '/platform/profile/ownership', name: 'Покупки и права', icon: 'file', iconStroked: true},
        {isButton: false, link: '/platform/profile/games', name: 'Мини-игры', icon: 'box', iconStroked: true},
        {isButton: false, link: '/platform/profile/referrals', name: 'Реферальная система', icon: 'user-plus', iconStroked: true},
      ],
      [
        {isButton: false, link: '/platform/profile/settings', name: 'Настройка аккаунта', icon: 'settings', iconStroked: true},
        {isButton: false, link: '/platform/profile/restrictions', name: 'Баны и предупреждения', icon: 'alert-triangle', iconStroked: true},
      ],
      [
        {isButton: true, name: 'Выйти со всех устройств', icon: 'laptop', iconStroked: true, callback: () => {this.logoutFromAllDevices()}},
        {isButton: true, name: 'Выйти', icon: 'logout', iconStroked: true, callback: () => {this.appStore.setIsExit(true)}},
      ]
    ])

    this.appStore.setAdminNavigation([
      [
        {isButton: false, link: '/admin/home', name: 'Домашняя', icon: 'home', iconStroked: true},
        {isButton: false, link: '/admin/wiki', name: 'Вики', icon: 'book', iconStroked: true},
        {isButton: false, link: '/admin/statistics', name: 'Статистика', icon: 'file', iconStroked: true},
        {isButton: false, link: '/admin/commerce', name: 'Товары и предложения', icon: 'shopping-bag', iconStroked: true},
        {isButton: false, link: '/admin/mini-games', name: 'Мини-игры', icon: 'joystick', iconStroked: true},
      ],
    ])

    this.appStore.setSocials([
      {link: 'https://vk.com/yurelax', name: 'Вконтакте', icon: 'vk', color: '#0077FF'},
      {link: 'https://discord.gg/xTWx7T4y6W', name: 'Дискорд', icon: 'dc', color: '#5865F2'},
      {link: '', name: 'Телеграм', icon: 'tg', color: '#0088CC'},
      {link: '', name: 'Ютуб', icon: 'yt', color: '#CD201F'},
    ])
  }

  private logoutFromAllDevices(): void {
    this.authService.logoutFromAllDevices().pipe(
      tap(() => {
        this.appStore.setIsExit(true);
      })
    ).subscribe()
  }

  private loadWikiNavigation(): void {
    this.wikiService.loading$.next(true)
    this.wikiService.getNavigation().pipe(
      tap(navigation => {
        const sidebarNavigation: SidebarNavigation = [
          [{name: 'Вики yurelax', link: `/platform/wiki/home`, icon: 'grid', iconStroked: true, isButton: false}]
        ]
        navigation.forEach(group => sidebarNavigation.push(group.map(item => ({
          name: item.metadata['title'],
          link: `/platform/wiki/${item.page}`,
          icon: item.metadata['icon'] ?? 'book',
          iconStroked: true,
          isButton: false,
          data: item
        }))))
        this.appStore.setWikiNavigation(sidebarNavigation)
      }),
      catchError(() => of([])),
      finalize(() => this.wikiService.loading$.next(false))
    ).subscribe()
  }

  private dataFields(): void {
    this.platformSession.status(true).pipe(
      switchMap(status => status.authenticated ? this.authService.getMe() : of(null)),
      tap(user => this.appStore.setIsLogged(user !== null)),
      catchError((err) => {
        this.systemUser.logout(false)
        return of(null)
      }),
      untilDestroyed(this)
    ).subscribe()
    this.appStore.isExit$.pipe(
      filter(isExit => isExit),
      switchMap(() => this.authService.logout()),
      tap(() => {
        this.systemUser.logout();
        this.appStore.setIsExit(false);
      }),
      catchError((err) => throwError(() => err)),
      untilDestroyed(this)
    ).subscribe()
  }
}
