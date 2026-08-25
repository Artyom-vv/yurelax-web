import {Injectable} from "@angular/core";
import {AdminState, DEFAULT_STATE} from "./admin-store.interface";
import {BehaviorSubject, distinctUntilChanged, map, Observable} from "rxjs";

@Injectable()
export class AdminStore {
  private readonly state$ = new BehaviorSubject<AdminState>(DEFAULT_STATE);

  readonly withoutScroll$: Observable<boolean> = this.state$.pipe(
    map(state => state.withoutScroll),
    distinctUntilChanged()
  );

  readonly setWithoutScroll = (withoutScroll: boolean): void => {
    this.state$.next({...this.state$.value, withoutScroll});
  };
}
