import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {PaginatorEndsInterface, PaginatorResponseInterface} from "./interfaces/paginator.interface";
import {BehaviorSubject, debounceTime, filter, map, Subscription, switchMap, tap} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'yrx-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnDestroy {
  @Input("count") STEP: number = 10;
  @Input("displayedPages") PREVIEW: number = 5;
  @Input("length") length$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  @Input("current_step") current_step$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  @Output() onChange: EventEmitter<PaginatorResponseInterface> = new EventEmitter();

  private subscriptions: Subscription[] = []

  public ends: PaginatorEndsInterface = {
    start: 0,
    end: 0
  }
  public LENGTH: number = 0;
  public total_steps: number = 0;
  public active_step: number = 0;
  public steps$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public form!: FormGroup

  // Init
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.initForms()
    this.watchForms()
    this.subscriptions.push(
      this.length$.pipe(
        tap(value => {
          this.LENGTH = value
          this.total_steps = this.LENGTH > this.STEP ? Math.ceil(this.LENGTH / this.STEP) : this.LENGTH === 0 ? 0 : 1;
          if (this.total_steps > this.PREVIEW) {
            this.steps$.next(Array.from(Array(this.PREVIEW).keys()).map(x => x + 1));
          } else {
            this.steps$.next(Array.from(Array(this.total_steps).keys()).map(x => x + 1));
          }
          this.ends = {
            start: 1,
            end: this.PREVIEW
          }
        }),
        switchMap(() => this.current_step$.pipe(
          tap((value) => {
            this.active_step = value ? value : 1
          })
        )),
        switchMap(() => this.route.queryParams.pipe(
          tap(({pagination}) => {
            if (pagination) {
              const pgn = parseInt(pagination)
              if (pgn <= this.total_steps) {
                this.current_step$.next(pgn)
                this.setConcreteStep(pgn)
              } else {
                this.current_step$.next(this.total_steps)
                this.setConcreteStep(this.total_steps)
              }
            }
          })
        )),
        filter((x, i) => i < 1),
        tap(() => {
          const out = this.calcPagination()
          this.onChange.emit(out)
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  calculatePaginationButtons(action: "prev" | "next"): void {
    if (action === "prev") {
      this.steps$.next([]);
      const future_step = this.active_step - 1;
      for (let i = future_step; i <= future_step + this.PREVIEW - 1; i++) {
        this.steps$.next([...this.steps$.value, i])
      }
    } else if (action === "next") {
      this.steps$.next([]);
      const future_step = this.active_step + 1;
      for (let i = future_step - this.PREVIEW + 1; i <= future_step; i++) {
        this.steps$.next([...this.steps$.value, i])
      }
    }
  }

  onPrev(): void {
    if (this.active_step - 1 >= 1) {
      console.log(this.ends)
      if (this.active_step === this.ends.start) {
        this.updatePaginationEnds("prev");
        this.calculatePaginationButtons("prev")
      }
      this.active_step--
      this.onChange.emit(this.calcPagination())
    }
  }

  onNext(): void {
    if (this.active_step + 1 <= this.total_steps) {
      console.log(this.ends)
      if (this.active_step === this.ends.end) {
        this.updatePaginationEnds("next");
        this.calculatePaginationButtons("next")
      }
      this.active_step++
      this.onChange.emit(this.calcPagination())
    }
  }

  selectPagination(element: number) {
    this.active_step = element;
    this.onChange.emit(this.calcPagination())
  }

  private updatePaginationEnds(action: "prev" | "next"): void {
    switch (action) {
      case "prev":
        this.ends.start--
        this.ends.end--
        break
      case "next":
        this.ends.start++
        this.ends.end++
        break
      default:
        this.ends.start
        this.ends.end
        break
    }
  }

  private calcPagination(): PaginatorResponseInterface {
    this.form?.get("page")?.setValue(this.active_step, {emitEvent: false})
    return {
      current_step: this.active_step,
      range: this.calcPaginationRange()
    }
  }

  private setConcreteStep(num: number): void {
    this.selectPagination(num)
    if (this.active_step >= (this.total_steps - (this.PREVIEW - 1)) && this.active_step <= this.total_steps) {
      this.ends = {
        start: this.total_steps > this.PREVIEW ? this.total_steps - (this.PREVIEW - 1) : this.total_steps,
        end: this.total_steps
      }
    } else if (this.active_step >= 1 && this.active_step <= 1 + (this.PREVIEW - 1)) {
      this.ends = {
        start: 1,
        end: 1 + (this.PREVIEW - 1)
      }
    } else {
      this.ends = {
        start: this.active_step,
        end: this.active_step + (this.PREVIEW - 1)
      }
    }
    this.steps$.next([]);
    for (let i = this.ends.start; i <= this.ends.end; i++) {
      this.steps$.next([...this.steps$.value, i])
    }
  }

  private calcPaginationRange() {
    const start: number = this.STEP * (this.active_step - 1);
    const end: number = start + this.STEP;
    return {start, end};
  }

  private initForms(): void {
    this.form = this.fb.group({
      page: [1]
    })
  }

  private watchForms(): void {
    const pageControl = this.form.get("page");
    this.subscriptions.push(
      pageControl?.valueChanges.pipe(
        map((value) => {
          let num = value;
          if (value > this.total_steps) {
            num = this.total_steps
          } else if (value <= 0) {
            num = 1
          }
          this.form?.get("page")?.setValue(num, {emitEvent: false})
          return num
        }),
        debounceTime(400),
        tap((num) => {
          if (num && num !== this.active_step) {
            this.setConcreteStep(num)
          }
        })
      ).subscribe()!
    )
  }
}
