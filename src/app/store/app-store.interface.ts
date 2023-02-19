import {UserStoreInterface} from "./interfaces/user-store.interface";
import {NavigationStoreInterface} from "./interfaces/navigation-store.interface";
import {SocialStoreInterface} from "./interfaces/socials-store.interface";
import {ProfileNavigationStoreInterface} from "./interfaces/profile-navigation-store.interface";

export interface AppState {
  user: UserStoreInterface | null
  isExit: boolean
  navigation: NavigationStoreInterface[]
  profileNavigation: ProfileNavigationStoreInterface[][]
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
  preloading: false
};
