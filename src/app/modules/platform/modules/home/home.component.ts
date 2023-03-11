import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {SystemUserService} from "../../../shared/services/global/system-user.service";

@Component({
  selector: 'yrx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore,
    private systemUserService: SystemUserService
  ) {
  }

  private subscriptions: Subscription[] = []

  public isLogged: boolean = false;
  public preloading: boolean = true;
  public dataLoading: boolean = true;
  public access_token: boolean = false;

  ngOnInit() {
    this.access_token = !!this.systemUserService.getAccessToken();
    this.appStore.setIsHomePage(true)
    this.subscriptions.push(
      this.appStore.isLogged$.pipe(
        tap((val) => {
          this.isLogged = val
          this.dataLoading = false;
        })
      ).subscribe()
    )
    this.subscriptions.push(
      this.appStore.preloading$.subscribe((val) => this.preloading = val)
    )
  }
  ngOnDestroy() {
    this.appStore.setIsHomePage(false)
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
