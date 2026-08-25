import {Component, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {Subscription} from "rxjs";
import {SocialStoreInterface} from "../../../../../../store/interfaces/socials-store.interface";

@Component({
    selector: 'yrx-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProfileHeaderComponent implements OnInit, OnDestroy {
  constructor(private appStore: AppStore) {
  }

  private subscriptions: Subscription[] = []

  public socials: SocialStoreInterface[] = []

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.socials$.subscribe(socials => {
        this.socials = socials
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
