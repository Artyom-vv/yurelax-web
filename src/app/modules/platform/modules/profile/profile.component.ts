import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription} from "rxjs";

@Component({
  selector: 'yrx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy  {
  constructor(
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public styles: {
    [key: string]: string
  } = {}

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.footerHeight$.subscribe((footerHeight) => {
        this.styles['minHeight'] = `calc(100vh + ${footerHeight}px`;
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
