import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import {IRatingRow, RatingTableInterface} from "../../interfaces/rating-table.interface";

@Component({
  selector: 'yrx-rating-table-point',
  templateUrl: './rating-table-point.component.html',
  styleUrls: ['./rating-table-point.component.scss']
})
export class RatingTablePointComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore
  ) {
  }

  @Input() data!: IRatingRow
  @Input() index!: number
  @Input() theme: 'dark' | 'bright' = 'dark'

  private subscriptions: Subscription[] = []

  public userStore: UserStoreInterface | null = null;

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((user) => {
          this.userStore = user;
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
