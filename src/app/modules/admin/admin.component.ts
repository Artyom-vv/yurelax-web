import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {AppStore} from "../../store/app.store";
import {Subscription, switchMap, tap} from "rxjs";
import {SidebarNav} from "../platform/modules/sidebar/interfaces/sidebar.nav";
import {AnimationsService} from "../shared/animations/services/animations.service";
import {AppearanceAnimation} from "../shared/animations/redirect.animation";
import {AdminStore} from "./store/admin.store";
import {ToolsService} from "../shared/services/tools.service";

@Component({
  selector: 'yrx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [AppearanceAnimation]
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore,
    private adminStore: AdminStore,
    public animationsService: AnimationsService,
    private toolsService: ToolsService,
    private cdr: ChangeDetectorRef
  ) {
  }

  private subscriptions: Subscription[] = []
  public adminNavigation: SidebarNav[][] = []
  public withoutScroll: boolean = this.toolsService.mobileAndTabletCheck();

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.adminNavigation$.pipe(
        tap((adminNavigation) => {
          this.adminNavigation = adminNavigation;
        }),
        switchMap(() => this.adminStore.withoutScroll$),
        tap((withoutScroll) => {
          this.withoutScroll = withoutScroll
          this.cdr.detectChanges()
        })
      ).subscribe()
    )
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
