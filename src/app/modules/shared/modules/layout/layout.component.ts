import {ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription} from "rxjs";
import {AppearanceAnimation} from "../../animations/redirect.animation";
import {AnimationsService} from "../../animations/services/animations.service";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {ToolsService} from "../../services/tools.service";

@Component({
  selector: 'yrx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    AppearanceAnimation,
  ]
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore,
    public animationsService: AnimationsService,
    @Inject(DOCUMENT) private document: Document,
    private toolsService: ToolsService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
  }

  @Input() withoutFooter: boolean = false;

  private subscriptions: Subscription[] = []

  public isHomePage: boolean = false
  public withoutScroll: boolean = !this.toolsService.mobileAndTabletCheck()
  public preloading: boolean = true
  public styles: {
    [key: string]: string
  } = {}
  public resizeObserver: ResizeObserver | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeObserver = new ResizeObserver((entries) => {
        const documentHeight: number = entries[0].target.clientHeight;
        this.withoutScroll = this.document.body.scrollHeight <= documentHeight
        this.cdr.detectChanges()
      });
    }
    this.subscriptions.push(
      this.appStore.preloading$.subscribe((preloading) => {
        this.preloading = preloading
      })
    )
    this.subscriptions.push(
      this.appStore.isHomePage$.subscribe((isHomePage) => {
        this.isHomePage = isHomePage
      })
    )
    if (!this.toolsService.mobileAndTabletCheck()) {
      this.resizeObserver?.observe(this.document.body)
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
