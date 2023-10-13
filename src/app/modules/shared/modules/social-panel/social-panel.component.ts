import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {SocialStoreInterface} from "../../../../store/interfaces/socials-store.interface";

@Component({
  host: {
    "class": "flex_grow"
  },
  selector: 'yrx-social-panel',
  templateUrl: './social-panel.component.html',
  styleUrls: ['./social-panel.component.scss']
})
export class SocialPanelComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public socials: SocialStoreInterface[] = []
  public social?: SocialStoreInterface;

  @Input() type: string = ''

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.appStore.socials$.pipe(
        tap((socials) => {
          this.socials = socials
          this.social = this.getSocial(this.type);
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public getSocial(social: string): SocialStoreInterface | undefined {
    return this.socials.find(x => x.icon === social)
  }
}
