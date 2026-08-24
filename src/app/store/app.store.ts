import {Injectable} from "@angular/core";
import {AppState, DEFAULT_STATE} from "./app-store.interface";
import {BehaviorSubject, distinctUntilChanged, map, Observable} from "rxjs";
import {NavStore} from "./interfaces/nav.store";
import {SocialStoreInterface} from "./interfaces/socials-store.interface";
import {SidebarNavigation, SidebarNavItem} from "../modules/platform/modules/sidebar/interfaces/sidebarNavItem";
import {UserRes} from "../modules/platform/interfaces/user.interface";
import {WikiNavigationItem} from "../modules/platform/pages/wiki/interfaces/wiki.interface";

@Injectable()
export class AppStore {
  private readonly state$ = new BehaviorSubject<AppState>(DEFAULT_STATE);

  readonly user$: Observable<UserRes | null> = this.select('user');
  readonly isExit$: Observable<boolean> = this.select('isExit');
  readonly isLogged$: Observable<boolean> = this.select('isLogged');
  readonly preloading$: Observable<boolean> = this.select('preloading');
  readonly navigation$: Observable<NavStore[]> = this.select('navigation');
  readonly profileNavigation$: Observable<SidebarNavigation> = this.select('profileNavigation');
  readonly wikiNavigation$: Observable<SidebarNavigation<WikiNavigationItem>> = this.select('wikiNavigation');
  readonly adminNavigation$: Observable<SidebarNavigation> = this.select('adminNavigation');
  readonly socials$: Observable<SocialStoreInterface[]> = this.select('socials');
  readonly footerHeight$: Observable<number> = this.select('footerHeight');
  readonly headerHeight$: Observable<number> = this.select('headerHeight');
  readonly isHomePage$: Observable<boolean> = this.select('isHomePage');

  readonly setIsLogged = (isLogged: boolean) => this.patch({isLogged});
  readonly setPreloading = (preloading: boolean) => this.patch({preloading});
  readonly setIsHomePage = (isHomePage: boolean) => this.patch({isHomePage});
  readonly setFooterHeight = (footerHeight: number) => this.patch({footerHeight});
  readonly setHeaderHeight = (headerHeight: number) => this.patch({headerHeight});
  readonly setSocials = (socials: SocialStoreInterface[]) => this.patch({socials});
  readonly setProfileNavigation = (profileNavigation: SidebarNavigation) => this.patch({profileNavigation});
  readonly setWikiNavigation = (wikiNavigation: SidebarNavigation<WikiNavigationItem>) => this.patch({wikiNavigation});
  readonly setAdminNavigation = (adminNavigation: SidebarNavigation) => this.patch({adminNavigation});
  readonly setNavigation = (navigation: NavStore[]) => this.patch({navigation});
  readonly setUser = (user: UserRes | null) => this.patch({user});
  readonly setIsExit = (isExit: boolean) => this.patch({isExit});

  private select<K extends keyof AppState>(key: K): Observable<AppState[K]> {
    return this.state$.pipe(map(state => state[key]), distinctUntilChanged());
  }

  private patch(patch: Partial<AppState>): void {
    this.state$.next({...this.state$.value, ...patch});
  }
}
