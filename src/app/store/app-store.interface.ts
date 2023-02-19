import {UserStoreInterface} from "./interfaces/user-store.interface";
import {NavigationStoreInterface} from "./interfaces/navigation-store.interface";
import {SocialStoreInterface} from "./interfaces/socials-store.interface";

export interface AppState {
  user: UserStoreInterface | null
  isExit: boolean
  navigation: NavigationStoreInterface[]
  socials: SocialStoreInterface[]
  footerHeight: number
  isHomePage: boolean
  isLogged: boolean
}
export const DEFAULT_STATE: AppState = {
  user: null,
  isExit: false,
  navigation: [],
  socials: [],
  footerHeight: 0,
  isHomePage: false,
  isLogged: false
};
