import {AfterViewInit, Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {SidebarNavItem} from "./interfaces/sidebarNavItem";
import {Router, Scroll} from "@angular/router";

@Component({
    selector: 'yrx-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SidebarComponent implements AfterViewInit {

  constructor(
    private router: Router
  ) {
  }

  @Input() navigation: SidebarNavItem[][] = []

  public activeIndex: number = 0

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof Scroll) {
        this.navigation.forEach((links, groupIdx) => {
          const idx = links.findIndex(link => link.link === event.routerEvent.url);
          if (idx > -1) this.activeIndex = this.getLinkIndex(groupIdx, idx)
        })
      }
    })
  }

  public getLinkIndex(groupIdx: number, idx: number): number {
    let index: number = idx;
    for (let i: number = 0; i < groupIdx; i++) index += this.navigation[i].length;
    return index
  }
}
