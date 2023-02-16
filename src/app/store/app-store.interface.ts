import {UserStoreInterface} from "./interfaces/user-store.interface";
import {NavigationStoreInterface} from "./interfaces/navigation-store.interface";

export interface AppState {
  user: UserStoreInterface | null
  isExit: boolean
  navigation: NavigationStoreInterface[]
}
export const DEFAULT_STATE: AppState = {
  user: null,
  isExit: false,
  navigation: []
};
