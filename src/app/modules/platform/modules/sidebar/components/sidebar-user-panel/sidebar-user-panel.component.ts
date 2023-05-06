import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {first, interval, retry, retryWhen, Subscription, switchMap, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import {ToolsService} from "../../../../../shared/services/tools.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'yrx-sidebar-user-panel',
  templateUrl: './sidebar-user-panel.component.html',
  styleUrls: ['./sidebar-user-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarUserPanelComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore,
    private toolsService: ToolsService,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {
  }

  private subscriptions: Subscription[] = []

  public userStore: UserStoreInterface | null = null
  public dataLoading: boolean = true;
  public lastOnlineStatus: string = ''

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((user) => {
          this.userStore = user
          if (user) {
            const {lastOnlineDate, isOnline} = user.userInfo
            this.lastOnlineStatus = this.getLastOnlineStatus(lastOnlineDate, isOnline)
          }
          this.dataLoading = false;
          this.cdr.detectChanges()
        }),
      ).subscribe()
    )
    this.subscriptions.push(
      interval(5000).pipe(
        switchMap(() => this.userService.getUserOnline({
          login: this.userStore?.user.login as string,
          userId: this.userStore?.user.userId as string,
        })),
        tap(({lastOnlineDate, isOnline}) => {
          if (this.userStore) this.appStore.setUser({
            ...this.userStore,
            userInfo: {
              ...this.userStore.userInfo,
              lastOnlineDate,
              isOnline
            }
          })
        }),
        retryWhen(errors => errors.pipe(retry(1)))
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public getLastOnlineStatus(lastOnlineDate: number, isOnline: boolean): string {
    if (!lastOnlineDate) return 'Не был на сервере'
    if (isOnline) return 'Онлайн на сервере'
    const currentDate: number = new Date().getTime()
    const seconds: number = Math.floor((currentDate - lastOnlineDate) / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60)
    const days: number = Math.floor((hours / 24))
    if (seconds < 60) return `Онлайн недавно`
    if (minutes < 60) return `Онлайн ${minutes} ${this.toolsService.declineWord(minutes, ['минуту', 'минуты', 'минут'])} назад`
    if (minutes < 1440) return `Онлайн ${hours} ${this.toolsService.declineWord(hours, ['час', 'часа', 'часов'])} назад`
    return `Онлайн ${days} ${this.toolsService.declineWord(days, ['день', 'дня', 'дней'])} назад`
  }
}
