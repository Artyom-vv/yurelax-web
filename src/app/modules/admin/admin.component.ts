import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {AppStore} from "../../store/app.store";
import {Subscription, switchMap, tap} from "rxjs";
import {SidebarNavItem} from "../platform/modules/sidebar/interfaces/sidebarNavItem";
import {AdminStore} from "./store/admin.store";
import {ToolsService} from "../shared/services/tools.service";

@Component({
    selector: 'yrx-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    standalone: false
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore,
    private adminStore: AdminStore,
    private toolsService: ToolsService,
    private cdr: ChangeDetectorRef
  ) {
  }

  private subscriptions: Subscription[] = []
  public adminNavigation: SidebarNavItem[][] = []
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
