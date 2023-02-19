import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";

@Component({
  selector: 'yrx-header-profile-panel',
  templateUrl: './header-profile-panel.component.html',
  styleUrls: ['./header-profile-panel.component.scss']
})
export class HeaderProfilePanelComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public user: UserStoreInterface | null = null

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((user) => {
          this.user = user
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
