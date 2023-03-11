import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {NavigationStoreInterface} from "../../../../store/interfaces/navigation-store.interface";
import {Subscription} from "rxjs";
import {SocialStoreInterface} from "../../../../store/interfaces/socials-store.interface";
import {SystemUserService} from "../../services/global/system-user.service";

@Component({
  selector: 'yrx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore,
    private systemUserService: SystemUserService
  ) {
  }

  @Input() light: boolean = false;

  private subscriptions: Subscription[] = []

  public routes: NavigationStoreInterface[] = []
  public socials: SocialStoreInterface[] = []
  public isLogged: boolean = false
  public dataLoading: boolean = true
  public preloading: boolean = true
  public access_token: boolean = false;

  ngOnInit() {
    this.access_token = !!this.systemUserService.getAccessToken();
    this.subscriptions.push(
      this.appStore.navigation$.subscribe((navigation) => {
        this.routes = navigation
      })
    )
    this.subscriptions.push(
      this.appStore.socials$.subscribe((socials) => {
        this.socials = socials
      })
    )
    this.subscriptions.push(
      this.appStore.isLogged$.subscribe((val) => {
        this.isLogged = val
        this.dataLoading = false;
      })
    )
    this.subscriptions.push(
      this.appStore.preloading$.subscribe((val) => {
        this.preloading = val;
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
