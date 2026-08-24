import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
    selector: 'yrx-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss'],
    standalone: false
})
export class OfferComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = []

  public dataLoading: boolean = false

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
