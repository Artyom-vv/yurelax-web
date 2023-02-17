import {AfterViewInit, Component, ElementRef,Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription} from "rxjs";
import {SocialStoreInterface} from "../../../../store/interfaces/socials-store.interface";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'yrx-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private appStore: AppStore,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  @ViewChild('footer') footer!: ElementRef;

  private subscriptions: Subscription[] = []

  public socials: SocialStoreInterface[] = []

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.socials$.subscribe((socials) => {
        this.socials = socials
      })
    )
  }

  ngAfterViewInit() {
    const footerHeight: number = this.footer.nativeElement.offsetHeight;
    this.appStore.setFooterHeight(footerHeight);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public scrollTop() {
    (function smoothScroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, currentScroll - (currentScroll / 16));
      }
    })();
  }
}
