import {UserStoreInterface} from "./interfaces/user-store.interface";
import {NavigationStoreInterface} from "./interfaces/navigation-store.interface";
import {SocialStoreInterface} from "./interfaces/socials-store.interface";
import {SidebarNavigationInterface} from "../modules/platform/modules/sidebar/interfaces/sidebar-navigation.interface";

export interface AppState {
  user: UserStoreInterface | null
  isExit: boolean
  navigation: NavigationStoreInterface[]
  profileNavigation: SidebarNavigationInterface[][]
  socials: SocialStoreInterface[]
  footerHeight: number
  isHomePage: boolean
  isLogged: boolean
  preloading: boolean
}
export const DEFAULT_STATE: AppState = {
  user: null,
  isExit: false,
  navigation: [],
  profileNavigation: [],
  socials: [],
  footerHeight: 0,
  isHomePage: false,
  isLogged: false,
  preloading: true
};
