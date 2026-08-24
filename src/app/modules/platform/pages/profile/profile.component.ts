import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription, switchMap, tap} from "rxjs";
import {AnimationsService} from "../../../shared/animations/services/animations.service";
import {RolesEnum} from "../../../shared/enums/roles.enum";
import {UserRes} from "../../interfaces/user.interface";
import {SidebarNavItem} from "../../modules/sidebar/interfaces/sidebarNavItem";

@Component({
    selector: 'yrx-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore,
    public animationsService: AnimationsService,
  ) {
  }

  private subscriptions: Subscription[] = []

  public profileNavigation: SidebarNavItem[][] = []
  public styles: {
    [key: string]: string
  } = {}
  public userStore: UserRes | null = null
  public RolesEnum = RolesEnum

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.footerHeight$.pipe(
        tap((footerHeight) => {
          this.styles['minHeight'] = `calc(100vh + ${footerHeight}px`;
        }),
        switchMap(() => this.appStore.profileNavigation$.pipe(
          tap((profileNavigation) => {
            this.profileNavigation = profileNavigation;
          })
        )),
        switchMap(() => this.appStore.user$.pipe(
          tap((userStore) => {
            this.userStore = userStore
          })
        ))
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
