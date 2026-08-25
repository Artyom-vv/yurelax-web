import {AuthState, DEFAULT_STATE, RecoveringPasswordType} from "./auth-store.interface";
import {Injectable} from "@angular/core";
import {BehaviorSubject, distinctUntilChanged, map, Observable} from "rxjs";

@Injectable()
export class AuthStore {
  private readonly state$ = new BehaviorSubject<AuthState>(DEFAULT_STATE);

  readonly MAKey$: Observable<string> = this.select('MAKey');
  readonly isRecoveringPasswordStep$: Observable<RecoveringPasswordType> = this.select('isRecoveringPasswordStep');
  readonly recoveringPasswordEmail$: Observable<string> = this.select('recoveringPasswordEmail');

  readonly setRecoveringPasswordEmail = (recoveringPasswordEmail: string) => this.patch({recoveringPasswordEmail});
  readonly setIsRecoveringPasswordStep = (isRecoveringPasswordStep: RecoveringPasswordType) => this.patch({isRecoveringPasswordStep});
  readonly setMAKey = (MAKey: string) => this.patch({MAKey});

  private select<K extends keyof AuthState>(key: K): Observable<AuthState[K]> {
    return this.state$.pipe(map(state => state[key]), distinctUntilChanged());
  }

  private patch(patch: Partial<AuthState>): void {
    this.state$.next({...this.state$.value, ...patch});
  }
}
