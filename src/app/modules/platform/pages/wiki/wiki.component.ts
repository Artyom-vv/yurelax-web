import {Component} from '@angular/core';
import {AppearanceAnimation} from "../../../shared/animations/redirect.animation";
import {AppStore} from "../../../../store/app.store";
import {AnimationsService} from "../../../shared/animations/services/animations.service";
import {SidebarNav} from '../../modules/sidebar/interfaces/sidebar.nav';
import {combineLatest, tap} from 'rxjs';

@Component({
  selector: 'yrx-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
  animations: [
    AppearanceAnimation,
  ]
})
export class WikiComponent {
  public wikiNavigation: SidebarNav[][] = []
  public styles: {
    [key: string]: string
  } = {}

  constructor(
    private appStore: AppStore,
  ) {
  }

  ngOnInit(): void {
    combineLatest([this.appStore.footerHeight$, this.appStore.headerHeight$]).pipe(
      tap(([footerHeight,headerHeight]) => {
        this.styles['minHeight'] = `calc(100vh - ${footerHeight}px + ${headerHeight}px`;
        console.log(this.styles)
      })
    ).subscribe()
    this.appStore.wikiNavigation$.pipe(
      tap(data => {
        this.wikiNavigation = data
      })
    ).subscribe()
  }
}
