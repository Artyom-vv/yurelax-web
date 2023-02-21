import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {UserResponseInterface} from "../../../../interfaces/user.interface";

@Component({
  selector: 'yrx-profile-user-panel',
  templateUrl: './profile-user-panel.component.html',
  styleUrls: ['./profile-user-panel.component.scss']
})
export class ProfileUserPanelComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public user: UserResponseInterface | null = null

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
