import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {SidebarNavigationInterface} from "../sidebar/interfaces/sidebar-navigation.interface";
import {AppearanceAnimation} from "../../../shared/animations/redirect.animation";
import {AnimationsService} from "../../../shared/animations/services/animations.service";

@Component({
  selector: 'yrx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    AppearanceAnimation,
  ]
})
export class ProfileComponent implements OnInit, OnDestroy  {
  constructor(
    private appStore: AppStore,
    public animationsService: AnimationsService,
  ) {
  }

  private subscriptions: Subscription[] = []

  public profileNavigation: SidebarNavigationInterface[][] = []
  public styles: {
    [key: string]: string
  } = {}

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.footerHeight$.subscribe((footerHeight) => {
        this.styles['minHeight'] = `calc(100vh + ${footerHeight}px`;
      })
    )
    this.subscriptions.push(
      this.appStore.profileNavigation$.pipe(
        tap((profileNavigation) => {
          this.profileNavigation = profileNavigation;
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
