import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../store/app.store";
import {Subscription, tap} from "rxjs";
import {SidebarNavigationInterface} from "../platform/modules/sidebar/interfaces/sidebar-navigation.interface";

@Component({
  selector: 'yrx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public adminNavigation: SidebarNavigationInterface[][] = []

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.adminNavigation$.pipe(
        tap((adminNavigation) => {
          this.adminNavigation = adminNavigation;
        })
      ).subscribe()
    )
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
