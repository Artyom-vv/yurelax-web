import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'yrx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public isLogged: boolean = false;

  ngOnInit() {
    this.appStore.setIsHomePage(true)
    this.subscriptions.push(
      this.appStore.isLogged$.pipe(
        tap((val) => this.isLogged = val)
      ).subscribe()
    )
  }
  ngOnDestroy() {
    this.appStore.setIsHomePage(false)
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
