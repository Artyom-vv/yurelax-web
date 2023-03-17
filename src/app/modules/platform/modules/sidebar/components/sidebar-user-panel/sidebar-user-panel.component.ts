import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import {ToolsService} from "../../../../../shared/services/tools.service";

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
    private cdr: ChangeDetectorRef
  ) {
  }

  private subscriptions: Subscription[] = []

  public userStore: UserStoreInterface | null = null
  public dataLoading: boolean = true;
  public lastOnlineStatus: string = ''
  public interval!: NodeJS.Timer;

  ngOnInit() {
    this.interval = setInterval(() => {this.lastOnlineStatus = this.getLastOnlineStatus(); this.cdr.detectChanges()},60000)
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((user) => {
          this.userStore = user
          this.lastOnlineStatus = this.getLastOnlineStatus()
          this.dataLoading = false;
          this.cdr.detectChanges()
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    clearInterval(this.interval)
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public getLastOnlineStatus(): string {
    const currentDate: number = new Date().getTime()
    const lastOnlineDate: number = this.userStore?.userInfo.lastOnlineDate as number
    const seconds: number = Math.ceil((currentDate - lastOnlineDate) / 1000);
    const minutes: number = Math.ceil(seconds / 60);
    const hours: number = Math.floor(minutes / 60)
    const days: number = Math.floor((hours / 24))
    console.log(currentDate)
    if (seconds < 60) return `Онлайн недавно`
    if (minutes < 60) return `Онлайн ${minutes} ${this.toolsService.declineWord(minutes, ['минуту', 'минуты', 'минут'])} назад`
    if (minutes < 1440) return `Онлайн ${hours} ${this.toolsService.declineWord(hours, ['час', 'часа', 'часов'])} назад`
    return `Онлайн ${days} ${this.toolsService.declineWord(days, ['день', 'дня', 'дней'])} назад`
  }
}
