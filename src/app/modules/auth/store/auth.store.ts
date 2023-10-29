import {ComponentStore} from "@ngrx/component-store";
import {AuthState, DEFAULT_STATE, RecoveringPasswordType} from "./auth-store.interface";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AuthStore extends ComponentStore<AuthState> {

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly MAKey$: Observable<string> = this.select(state => state.MAKey);
  readonly isRecoveringPasswordStep$: Observable<RecoveringPasswordType> = this.select(state => state.isRecoveringPasswordStep);
  readonly recoveringPasswordEmail$: Observable<string> = this.select(state => state.recoveringPasswordEmail);

  readonly setRecoveringPasswordEmail = this.updater((state, recoveringPasswordEmail: string) => ({
    ...state,
    recoveringPasswordEmail
  }));

  readonly setIsRecoveringPasswordStep = this.updater((state, isRecoveringPasswordStep: RecoveringPasswordType) => ({
    ...state,
    isRecoveringPasswordStep
  }));

  readonly setMAKey = this.updater((state, MAKey: string) => ({
    ...state,
    MAKey
  }));
}
