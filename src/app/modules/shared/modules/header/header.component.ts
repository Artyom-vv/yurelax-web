import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {NavigationStoreInterface} from "../../../../store/interfaces/navigation-store.interface";
import {Subscription} from "rxjs";

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

  private subscriptions: Subscription[] = []

  public routes: NavigationStoreInterface[] = []

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.navigation$.subscribe((navigation) => {
        this.routes = navigation
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
