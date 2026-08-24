import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import { Subscription, switchMap, tap} from "rxjs";
import {SkinsService} from "../../../../services/skins.service";
import {UserRes} from "../../../../../platform/interfaces/user.interface";

@Component({
    selector: 'yrx-header-profile-panel',
    templateUrl: './header-profile-panel.component.html',
    styleUrls: ['./header-profile-panel.component.scss'],
    standalone: false
})
export class HeaderProfilePanelComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore,
    private skinsService: SkinsService
  ) {
  }

  @Input() dark: boolean = false;

  private subscriptions: Subscription[] = []

  public userStore: UserRes | null = null
  public isLogged: boolean = false
  public dataLoading: boolean = true;

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((user) => {
          this.userStore = user
          console.log(this.userStore)
          this.dataLoading = false;
        }),
        // switchMap((user) => this.skinsService.getAvatar(user?.login)),
        // tap((val) => {
        //   console.log(val)
        // this.dataLoading = false;
        // })
        switchMap(() => this.appStore.isLogged$),
        tap((isLogged) => {
          this.isLogged = isLogged
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
