import {Component, OnInit} from '@angular/core';
import {AppStore} from "../../../../../../store/app.store";
import {tap} from "rxjs";
import {SidebarNavItem} from "../../../../modules/sidebar/interfaces/sidebarNavItem";
import {WikiNavigationItem} from "../../interfaces/wiki.interface";

@Component({
    selector: 'yrx-wiki-home',
    templateUrl: './wiki-home.component.html',
    styleUrls: ['./wiki-home.component.scss'],
    standalone: false
})
export class WikiHomeComponent implements OnInit {

  public navigation: SidebarNavItem<WikiNavigationItem>[] = []

  constructor(
    private appStore: AppStore,
  ) {
  }

  ngOnInit() {
    this.appStore.wikiNavigation$.pipe(
      tap(navigation => {
        this.navigation = navigation.slice(1).flatMap(y => y.map(x => x))
      })
    ).subscribe()
  }
}
