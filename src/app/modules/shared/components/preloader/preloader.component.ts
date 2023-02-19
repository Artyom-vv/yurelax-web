import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, query, state, style, transition, trigger} from "@angular/animations";
import {AppStore} from "../../../../store/app.store";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'yrx-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    trigger("fadeAnimation", [
      state('false', style({
        opacity: 0,
        display: 'none'
      })),
      transition('true => false', [
        query(':self', animate('0.5s ease'))
      ])
    ])
  ]
})
export class PreloaderComponent implements  OnInit, OnDestroy {
  constructor(private appStore: AppStore) {
  }

  private subscriptions: Subscription[] = []

  public preloader: boolean = true;

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.preloading$.pipe(
        tap((val) => {
          this.preloader = val;
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
