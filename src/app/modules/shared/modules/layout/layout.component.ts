import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription} from "rxjs";

@Component({
  selector: 'yrx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public isHomePage: boolean = false
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
      this.appStore.isHomePage$.subscribe((isHomePage) => {
        this.isHomePage = isHomePage
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
