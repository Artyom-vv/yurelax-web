import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {first, Observable, switchMap, tap} from "rxjs";
import {WikiService} from "../../services/wiki.service";
import {WikiNavigationItem, WikiPage} from "../../interfaces/wiki.interface";
import {Properties} from "csstype";
import {AppearanceAnimation} from "../../../../../shared/animations/redirect.animation";
import {Title} from "@angular/platform-browser";
import {AppStore} from "../../../../../../store/app.store";
import {SidebarNavigation, SidebarNavItem} from "../../../../modules/sidebar/interfaces/sidebarNavItem";
import {FootPanelItem} from "../../../../../shared/modules/foot-panel/interfaces/foot-panel.interface";

@Component({
    selector: 'yrx-wiki-page',
    templateUrl: './wiki-page.component.html',
    styleUrls: ['./wiki-page.component.scss'],
    animations: [AppearanceAnimation],
    standalone: false
})
export class WikiPageComponent implements OnInit {

  public page?: WikiPage
  public loading$: Observable<boolean> = this.wikiService.loading$.asObservable()
  public styles: Properties = {
    borderRadius: '6px',
    height: '90px'
  };
  public pageName: string = 'appearance';
  public navigation: SidebarNavItem<WikiNavigationItem>[] = []
  public buttons: FootPanelItem<WikiNavigationItem>[] = []

  constructor(
    private route: ActivatedRoute,
    private appStore: AppStore,
    private titleService: Title,
    private wikiService: WikiService
  ) {
  }

  ngOnInit() {
    this.appStore.wikiNavigation$.pipe(
      tap(navigation => this.navigation = navigation.flatMap(group => group.map(x => x))),
      switchMap(() => this.route.paramMap.pipe(
        switchMap(params => {
          this.pageName = params.get('page')!

          const currentItemIndex = this.navigation.findIndex(item => item.data?.page === this.pageName);
          if (currentItemIndex !== -1) {
            this.buttons = [
              { type: 'back', data: this.navigation[currentItemIndex - 1]?.data },
              { type: 'forward', data: this.navigation[currentItemIndex + 1]?.data }
            ].filter<FootPanelItem>((x): x is FootPanelItem => !!x.data);
          }

          console.log(this.buttons)

          return this.wikiService.getPage(this.pageName)
        }),
        tap(data => {
          this.page = data;
          this.titleService.setTitle(`Вики — ${data.metadata['title']}`);
        }),
      ))
    ).subscribe()
  }

  isNotLast(idx: number) {
    return idx !== (this.page?.slices ?? []).length-1
  }

  redirect(url: string) {
    const a = document.createElement("a")
    a.href = url
    a.target = '_blank'
    a.click()
  }

  getSpacingType(value: string): any {
    return value;
  }
}
