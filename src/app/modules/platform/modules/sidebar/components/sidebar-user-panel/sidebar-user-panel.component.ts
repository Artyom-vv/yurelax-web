import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {
  EMPTY, filter,
  iif,
  interval,
  MonoTypeOperatorFunction,
  Observable,
  retry,
  retryWhen,
  Subscription,
  switchMap,
  tap
} from "rxjs";
import {ToolsService} from "../../../../../shared/services/tools.service";
import {UserService} from "../../../../services/user.service";
import {GetUserOnlineResponseInterface} from "../../../../interfaces/get-user-online-response.interface";
import {GetUserOnlineReq} from "../../../../interfaces/get-user-online.req";
import {UserRes} from "../../../../interfaces/user.interface";

@Component({
  selector: 'yrx-sidebar-user-panel',
  templateUrl: './sidebar-user-panel.component.html',
  styleUrls: ['./sidebar-user-panel.component.scss'],
})
export class SidebarUserPanelComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore,
    private toolsService: ToolsService,
    private userService: UserService
  ) {
  }

  private subscriptions: Subscription[] = []

  public userStore: UserRes | null = null
  public dataLoading: boolean = true;
  public lastOnlineStatus: string = ''
  public pingPlayerRequest$: (_: GetUserOnlineReq) => Observable<GetUserOnlineResponseInterface> = (_: GetUserOnlineReq) => this.userService.getUserOnline(_).pipe(
    tap(({lastOnlineDate, isOnline}) => {
      if (this.userStore) this.appStore.setUser({
        ...this.userStore,
        userInfoRef: {
          ...this.userStore.userInfoRef,
          lastOnlineDate,
          isOnline
        }
      })
    }),
    retryWhen(errors => errors.pipe(retry(1)))
  )

  ngOnInit() {
    let request!: GetUserOnlineReq;
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((user) => {
          this.userStore = user
          if (user) {
            const {lastOnlineDate, isOnline} = user.userInfoRef
            this.lastOnlineStatus = this.getLastOnlineStatus(lastOnlineDate, isOnline)
            request = {
              login: this.userStore?.login as string,
              userId: this.userStore?._id as string,
            }
          }
          this.dataLoading = false;
        }),
        filter((x, i) => i === 0),
        switchMap(() => this.pingPlayerRequest$(request))).subscribe()
    )
    this.subscriptions.push(
      interval(5000).pipe(
        switchMap(() => this.pingPlayerRequest$(request))
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
