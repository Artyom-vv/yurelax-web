import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AppStore} from "../../../../../../store/app.store";
import {ProfileNavigationStoreInterface} from "../../../../../../store/interfaces/profile-navigation-store.interface";

@Component({
  selector: 'yrx-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public profileNavigation: ProfileNavigationStoreInterface[][] = []

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.profileNavigation$.subscribe((navigation) => {
        this.profileNavigation = navigation
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
