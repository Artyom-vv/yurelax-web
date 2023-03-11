import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, switchMap, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import {SkinsService} from "../../../../services/skins.service";

@Component({
  selector: 'yrx-header-profile-panel',
  templateUrl: './header-profile-panel.component.html',
  styleUrls: ['./header-profile-panel.component.scss'],
})
export class HeaderProfilePanelComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore,
    private skinsService: SkinsService
  ) {
  }

  @Input() dark: boolean = false;

  private subscriptions: Subscription[] = []

  public user: UserStoreInterface | null = null
  public isLogged: boolean = false

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((user) => {
          this.user = user
        }),
        switchMap(() => this.appStore.isLogged$),
        tap((isLogged) => {
          this.isLogged = isLogged
        }),
        // switchMap((user) => this.skinsService.getAvatar(user?.login)),
        // tap((val) => {
        //   console.log(val)
        // })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
