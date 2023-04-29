import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {AdminState, DEFAULT_STATE} from "./admin-store.interface";
import {Observable} from "rxjs";

@Injectable()
export class AdminStore extends ComponentStore<AdminState> {

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly withoutScroll$: Observable<boolean> = this.select(state => state.withoutScroll);

  readonly setWithoutScroll = this.updater((state, withoutScroll: boolean) => ({
    ...state,
    withoutScroll
  }));
}
