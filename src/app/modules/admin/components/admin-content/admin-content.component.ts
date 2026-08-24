import {ChangeDetectorRef, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {AnimationsService} from "../../../shared/animations/services/animations.service";
import {AppearanceAnimation} from "../../../shared/animations/redirect.animation";
import {DOCUMENT} from "@angular/common";
import {ToolsService} from "../../../shared/services/tools.service";
import {AdminStore} from "../../store/admin.store";

@Component({
    selector: 'yrx-admin-content',
    templateUrl: './admin-content.component.html',
    styleUrls: ['./admin-content.component.scss'],
    animations: [AppearanceAnimation],
    standalone: false
})
export class AdminContentComponent {
  constructor(
    public animationsService: AnimationsService,
    @Inject(DOCUMENT) private document: Document,
    private toolsService: ToolsService,
    private cdr: ChangeDetectorRef,
    private adminStore: AdminStore
  ) {
  }

  @ViewChild('container') container!: ElementRef

  public resizeObserver: ResizeObserver = new ResizeObserver((entries) => {
    const documentHeight: number = entries[0].target.clientHeight;
    this.withoutScroll = this.document.body.clientHeight >= documentHeight
    this.adminStore.setWithoutScroll(this.withoutScroll)
    this.cdr.detectChanges()
  })
  public withoutScroll: boolean = !this.toolsService.mobileAndTabletCheck()

  ngAfterViewInit() {
    if (!this.toolsService.mobileAndTabletCheck()) {
      this.resizeObserver.observe(this.container.nativeElement)
    }
  }
}
