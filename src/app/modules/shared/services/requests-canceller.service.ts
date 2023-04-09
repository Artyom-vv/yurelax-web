import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class RequestsCancellerService {
  public destroy$: Subject<void> = new Subject<void>();

  constructor() {
  }

  public cancel(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$ = new Subject<void>();
  }

}
