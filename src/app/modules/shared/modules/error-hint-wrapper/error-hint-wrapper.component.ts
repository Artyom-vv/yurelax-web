import {
  BehaviorSubject,
  debounceTime,
  combineLatest,
  Observable,
  of,
  switchMap,
  tap,
} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit} from "@angular/core";
import {
  BASE_COMPONENT_INPUT_BLUR,
  BaseComponentInputDirective
} from "../text-fields/directives/base-component-input.directive";
import {ValidationErrors} from "@angular/forms";
import {animateChild, transition, trigger} from "@angular/animations";

@UntilDestroy()
@Component({
  host: {
    "[style.display]": "display"
  },
  selector: 'yrx-error-hint-wrapper',
  templateUrl: './error-hint-wrapper.component.html',
  styleUrls: ['./error-hint-wrapper.component.scss'],
  animations: [
    trigger('childTrigger', [
      transition(':leave', [
        animateChild()
      ]),
    ]),
  ]
})
export class ErrorHintWrapperComponent implements OnInit, AfterViewInit {
  @Input() isYandexCringe: boolean = false;

  display: string = 'none'
  errors = new BehaviorSubject<ValidationErrors>({})
  errorsCount = 0

  get control() {
    return this.baseInput.baseDirective?.control
  }

  constructor(
    private cdr: ChangeDetectorRef,
    public baseInput: BaseComponentInputDirective,
    @Inject(BASE_COMPONENT_INPUT_BLUR) private inputBlur: Observable<Event>
  ) {
  }

  ngOnInit() {
    if (this.control) {
      this.control.valueChanges.pipe(
        tap(() => {
          this.errors.next(this.control?.errors ?? {})
          this.cdr.detectChanges()
        })
      ).subscribe();
    }

    combineLatest([this.inputBlur, this.errors]).pipe(
      switchMap(([, errors]) =>
        (this.isYandexCringe ? of(null).pipe(debounceTime(50)) : of(null)).pipe(
          tap(() => {
            this.errorsCount = Object.keys(errors).length
            this.display = this.checkConditions(errors) ? 'block' : 'none';
          })
        )
      ),
      untilDestroyed(this)
    ).subscribe()
  }

  ngAfterViewInit() {
  }

  public checkConditions(errors: ValidationErrors | null | undefined) {
    return (this.baseInput.hints ?? []).some(hint => {
      const keys = Array.from(Object.keys(errors ?? {}))
      return keys.some(key => {
        if (Array.isArray(hint.field)) {
          return hint.field.includes(key)
        }
        return key === hint.field
      })
    })
  }
}
