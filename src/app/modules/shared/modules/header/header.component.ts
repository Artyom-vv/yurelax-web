import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {NavigationStoreInterface} from "../../../../store/interfaces/navigation-store.interface";
import {Subscription} from "rxjs";
import {SocialStoreInterface} from "../../../../store/interfaces/socials-store.interface";

@Component({
  selector: 'yrx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore
  ) {
  }

  @Input() light: boolean = false;

  private subscriptions: Subscription[] = []

  public routes: NavigationStoreInterface[] = []
  public socials: SocialStoreInterface[] = []
  public isLogged: boolean = false

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.navigation$.subscribe((navigation) => {
        this.routes = navigation
      })
    )
    this.subscriptions.push(
      this.appStore.socials$.subscribe((socials) => {
        this.socials = socials
      })
    )
    this.subscriptions.push(
      this.appStore.isLogged$.subscribe((val) => {
        this.isLogged = val
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
