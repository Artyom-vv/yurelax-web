import {isPlatformBrowser} from '@angular/common';
import {
  ChangeDetectorRef, Component, ElementRef, Inject, ViewChild, DOCUMENT,
  ChangeDetectionStrategy, OnDestroy, PLATFORM_ID,
} from '@angular/core';
import {AnimationsService} from "../../../shared/animations/services/animations.service";
import {AppearanceAnimation} from "../../../shared/animations/redirect.animation";

import {ToolsService} from "../../../shared/services/tools.service";
import {AdminStore} from "../../store/admin.store";

@Component({
    selector: 'yrx-admin-content',
    templateUrl: './admin-content.component.html',
    styleUrls: ['./admin-content.component.scss'],
    animations: [AppearanceAnimation],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdminContentComponent implements OnDestroy {
  constructor(
    public animationsService: AnimationsService,
    @Inject(DOCUMENT) private document: Document,
    private toolsService: ToolsService,
    private cdr: ChangeDetectorRef,
    private adminStore: AdminStore,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
    this.withoutScroll = !this.toolsService.mobileAndTabletCheck();
  }

  @ViewChild('container') container!: ElementRef

  public resizeObserver: ResizeObserver | null = null;
  public withoutScroll: boolean;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId) || this.toolsService.mobileAndTabletCheck()) return;
    this.resizeObserver = new ResizeObserver((entries) => {
      const documentHeight: number = entries[0].target.clientHeight;
      this.withoutScroll = this.document.body.clientHeight >= documentHeight;
      this.adminStore.setWithoutScroll(this.withoutScroll);
      this.cdr.detectChanges();
    });
    this.resizeObserver.observe(this.container.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
