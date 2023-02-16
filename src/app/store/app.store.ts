import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {AppState, DEFAULT_STATE} from "./app-store.interface";
import {Observable} from "rxjs";
import {UserStoreInterface} from "./interfaces/user-store.interface";
import {NavigationStoreInterface} from "./interfaces/navigation-store.interface";

@Injectable()
export class AppStore extends ComponentStore<AppState> {

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly user$: Observable<UserStoreInterface | null> = this.select(state => state.user);
  readonly isExit$: Observable<boolean> = this.select(state => state.isExit);

  readonly navigation$: Observable<NavigationStoreInterface[]> = this.select(state => state.navigation);

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
