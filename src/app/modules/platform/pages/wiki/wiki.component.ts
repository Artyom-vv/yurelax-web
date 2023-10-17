import {Component} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {SidebarNavItem} from '../../modules/sidebar/interfaces/sidebarNavItem';
import {combineLatest, tap} from 'rxjs';
import {WikiService} from "./services/wiki.service";

@Component({
  selector: 'yrx-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
})
export class WikiComponent {
  public wikiNavigation: SidebarNavItem[][] = []
  public styles: {
    [key: string]: string
  } = {}

  constructor(
    private appStore: AppStore,
    private wikiService: WikiService,
  ) {
  }

  ngOnInit(): void {
    combineLatest([this.appStore.footerHeight$, this.appStore.headerHeight$]).pipe(
      tap(([footerHeight,headerHeight]) => {
        this.styles['minHeight'] = `calc(100vh - ${footerHeight}px + ${headerHeight}px`;
      })
    ).subscribe()
    this.appStore.wikiNavigation$.pipe(
      tap(data => {
        this.wikiNavigation = data
      })
    ).subscribe()
  }
}
