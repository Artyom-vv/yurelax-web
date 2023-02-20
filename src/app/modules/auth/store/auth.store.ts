import {ComponentStore} from "@ngrx/component-store";
import {AuthState, DEFAULT_STATE} from "./auth-store.interface";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AuthStore extends ComponentStore<AuthState> {

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly isWaitingForMA$: Observable<boolean> = this.select(state => state.isWaitingForMA);

  readonly setIsWaitingForMA = this.updater((state, isWaitingForMA: boolean) => ({
    ...state,
    isWaitingForMA
  }));
}
