import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import {IRatingRow, RatingTableInterface} from "../../interfaces/rating-table.interface";
import {AnimationsService} from "../../../../animations/services/animations.service";

@Component({
  selector: 'yrx-rating-table-point',
  templateUrl: './rating-table-point.component.html',
  styleUrls: ['./rating-table-point.component.scss']
})
export class RatingTablePointComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private appStore: AppStore,
    private animationsService: AnimationsService
  ) {
  }

  @Input() data!: IRatingRow
  @Input() index!: number
  @Input() theme: 'dark' | 'bright' = 'dark'
  @ViewChild('item') item!: ElementRef

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

  ngAfterViewInit() {
    this.animationsService.slideAnimation(150 + (this.index + 1) * 100, this.item, 10)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
