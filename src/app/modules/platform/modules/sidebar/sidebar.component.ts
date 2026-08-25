import {AfterViewInit, Component, Input, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {SidebarNavItem} from "./interfaces/sidebarNavItem";
import {NavigationEnd, Router, Scroll} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'yrx-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SidebarComponent implements AfterViewInit, OnDestroy {

  constructor(
    private router: Router
  ) {
  }

  @Input() navigation: SidebarNavItem[][] = []
  @Input() collapsible = false
  @Input() mobileLabel = 'Разделы'

  public activeIndex: number = 0
  public mobileOpen = false
  private routerSubscription?: Subscription

  ngAfterViewInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof Scroll) {
        this.updateActiveIndex(event.routerEvent.url)
      }
      if (event instanceof NavigationEnd) {
        this.updateActiveIndex(event.urlAfterRedirects)
        this.closeMobile()
      }
    })
    this.updateActiveIndex(this.router.url)
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe()
  }

  public toggleMobile(): void {
    if (!this.collapsible) return
    this.mobileOpen = !this.mobileOpen
  }

  public closeMobile(): void {
    this.mobileOpen = false
  }

  private updateActiveIndex(url: string): void {
    this.navigation.forEach((links, groupIdx) => {
      const idx = links.findIndex(link => link.link === url)
      if (idx > -1) this.activeIndex = this.getLinkIndex(groupIdx, idx)
    })
  }

  public getLinkIndex(groupIdx: number, idx: number): number {
    let index: number = idx;
    for (let i: number = 0; i < groupIdx; i++) index += this.navigation[i].length;
    return index
  }
}
