import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {NavStore} from "../../../../store/interfaces/nav.store";
import {Subscription} from "rxjs";
import {SocialStoreInterface} from "../../../../store/interfaces/socials-store.interface";

@Component({
  selector: 'yrx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private appStore: AppStore,
  ) {
  }

  @Input() light: boolean = false;
  @ViewChild('header') header!: ElementRef<HTMLElement>

  private subscriptions: Subscription[] = []

  public routes: NavStore[] = []
  public socials: SocialStoreInterface[] = []
  public isLogged: boolean = false
  public dataLoading: boolean = true
  public preloading: boolean = true
  public access_token: boolean = false;

  ngOnInit() {
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
        this.access_token = val
        this.dataLoading = false;
      })
    )
    this.subscriptions.push(
      this.appStore.preloading$.subscribe((val) => {
        this.preloading = val;
      })
    )
  }

  ngAfterViewInit() {
    this.appStore.setHeaderHeight(this.header.nativeElement.clientHeight)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
