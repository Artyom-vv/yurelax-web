import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {AppState, DEFAULT_STATE} from "./app-store.interface";
import {Observable} from "rxjs";
import {UserStoreInterface} from "./interfaces/user-store.interface";
import {NavigationStoreInterface} from "./interfaces/navigation-store.interface";
import {SocialStoreInterface} from "./interfaces/socials-store.interface";
import {SidebarNavigationInterface} from "../modules/platform/modules/sidebar/interfaces/sidebar-navigation.interface";

@Injectable()
export class AppStore extends ComponentStore<AppState> {

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly user$: Observable<UserStoreInterface | null> = this.select(state => state.user);
  readonly isExit$: Observable<boolean> = this.select(state => state.isExit);
  readonly isLogged$: Observable<boolean> = this.select(state => state.isLogged);

  readonly preloading$: Observable<boolean> = this.select(state => state.preloading);
  readonly navigation$: Observable<NavigationStoreInterface[]> = this.select(state => state.navigation);
  readonly profileNavigation$: Observable<SidebarNavigationInterface[][]> = this.select(state => state.profileNavigation);
  readonly socials$: Observable<SocialStoreInterface[]> = this.select(state => state.socials);
  readonly footerHeight$: Observable<number> = this.select(state => state.footerHeight);
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

  readonly setSocials = this.updater((state, socials: SocialStoreInterface[]) => ({
    ...state,
    socials
  }));

  readonly setProfileNavigation = this.updater((state, profileNavigation: SidebarNavigationInterface[][]) => ({
    ...state,
    profileNavigation
  }));

  readonly setNavigation = this.updater((state, navigation: NavigationStoreInterface[]) => ({
    ...state,
    navigation
  }));

  readonly setUser = this.updater((state, user: UserStoreInterface | null) => ({
    ...state,
    user
  }));

  readonly setIsExit = this.updater((state, isExit: boolean) => ({
    ...state,
    isExit
  }));
}
