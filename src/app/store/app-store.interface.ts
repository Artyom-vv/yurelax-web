import {NavStore} from "./interfaces/nav.store";
import {SocialStoreInterface} from "./interfaces/socials-store.interface";
import {SidebarNav} from "../modules/platform/modules/sidebar/interfaces/sidebar.nav";
import {UserRes} from "../modules/platform/interfaces/user.interface";

export interface AppState {
  user: UserRes | null
  isExit: boolean
  navigation: NavStore[]
  profileNavigation: SidebarNav[][]
  wikiNavigation: SidebarNav[][]
  adminNavigation: SidebarNav[][]
  socials: SocialStoreInterface[]
  footerHeight: number
  headerHeight: number
  isHomePage: boolean
  isLogged: boolean
  preloading: boolean
}
export const DEFAULT_STATE: AppState = {
  user: null,
  isExit: false,
  navigation: [],
  profileNavigation: [],
  wikiNavigation: [],
  adminNavigation: [],
  socials: [],
  footerHeight: 0,
  headerHeight: 0,
  isHomePage: false,
  isLogged: false,
  preloading: true
};
