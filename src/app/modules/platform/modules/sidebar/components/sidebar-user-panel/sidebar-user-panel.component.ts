import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";

@Component({
  selector: 'yrx-sidebar-user-panel',
  templateUrl: './sidebar-user-panel.component.html',
  styleUrls: ['./sidebar-user-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarUserPanelComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore,
    private cdr: ChangeDetectorRef
  ) {
  }

  private subscriptions: Subscription[] = []

  public userStore: UserStoreInterface | null = null
  public dataLoading: boolean = true;
  public lastOnlineStatus: string = ''
  public interval!: NodeJS.Timer;

  ngOnInit() {
    this.interval = setInterval(() => this.lastOnlineStatus = this.getLastOnlineStatus(),60000)
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((user) => {
          this.userStore = user
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
    const minutes: number = Math.ceil((currentDate - lastOnlineDate) / 60000);
    const hours: number = Math.floor(minutes / 60)
    const days: number = Math.floor((hours / 24))
    if (minutes < 60) return 'Онлайн ' + minutes + ' минут назад'
    if (minutes < 1440) return 'Онлайн ' + hours + ' часов назад'
    return 'Онлайн ' + days + ' дней назад'
  }
}
