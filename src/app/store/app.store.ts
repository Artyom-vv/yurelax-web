import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {AppState, DEFAULT_STATE} from "./app-store.interface";
import {Observable} from "rxjs";
import {NavStore} from "./interfaces/nav.store";
import {SocialStoreInterface} from "./interfaces/socials-store.interface";
import {SidebarNavigation, SidebarNavItem} from "../modules/platform/modules/sidebar/interfaces/sidebarNavItem";
import {UserRes} from "../modules/platform/interfaces/user.interface";
import {WikiNavigationItem} from "../modules/platform/pages/wiki/interfaces/wiki.interface";

@Injectable()
export class AppStore extends ComponentStore<AppState> {

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly user$: Observable<UserRes | null> = this.select(state => state.user);
  readonly isExit$: Observable<boolean> = this.select(state => state.isExit);
  readonly isLogged$: Observable<boolean> = this.select(state => state.isLogged);

  readonly preloading$: Observable<boolean> = this.select(state => state.preloading);
  readonly navigation$: Observable<NavStore[]> = this.select(state => state.navigation);
  readonly profileNavigation$: Observable<SidebarNavigation> = this.select(state => state.profileNavigation);
  readonly wikiNavigation$: Observable<SidebarNavigation<WikiNavigationItem>> = this.select(state => state.wikiNavigation);
  readonly adminNavigation$: Observable<SidebarNavigation> = this.select(state => state.adminNavigation);
  readonly socials$: Observable<SocialStoreInterface[]> = this.select(state => state.socials);
  readonly footerHeight$: Observable<number> = this.select(state => state.footerHeight);
  readonly headerHeight$: Observable<number> = this.select(state => state.headerHeight);
  readonly isHomePage$: Observable<boolean> = this.select(state => state.isHomePage);

  readonly setIsLogged = this.updater((state, isLogged: boolean) => ({
    ...state,
    isLogged
  }));

  readonly setPreloading = this.updater((state, preloading: boolean) => ({
    ...state,
    preloading
  }));

  readonly setIsHomePage = this.updater((state, isHomePage: boolean) => ({
    ...state,
    isHomePage
  }));

  readonly setFooterHeight = this.updater((state, footerHeight: number) => ({
    ...state,
    footerHeight
  }));

  readonly setHeaderHeight = this.updater((state, headerHeight: number) => ({
    ...state,
    headerHeight
  }));

  readonly setSocials = this.updater((state, socials: SocialStoreInterface[]) => ({
    ...state,
    socials
  }));

  readonly setProfileNavigation = this.updater((state, profileNavigation: SidebarNavigation) => ({
    ...state,
    profileNavigation
  }));

  readonly setWikiNavigation = this.updater((state, wikiNavigation: SidebarNavigation) => ({
    ...state,
    wikiNavigation
  }));

  readonly setAdminNavigation = this.updater((state, adminNavigation: SidebarNavigation) => ({
    ...state,
    adminNavigation
  }));

  readonly setNavigation = this.updater((state, navigation: NavStore[]) => ({
    ...state,
    navigation
  }));

  readonly setUser = this.updater((state, user: UserRes | null) => ({
    ...state,
    user
  }));

  readonly setIsExit = this.updater((state, isExit: boolean) => ({
    ...state,
    isExit
  }));
}
