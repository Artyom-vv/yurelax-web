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
    ],
    standalone: false
})
export class ErrorHintWrapperComponent implements OnInit, AfterViewInit {
  @Input() isYandexCringe: boolean = false;

  display: string = 'none'

  get control() {
    return this.baseInput.baseDirective?.control
  }

  constructor(
    public baseInput: BaseComponentInputDirective,
    @Inject(BASE_COMPONENT_INPUT_BLUR) private inputBlur: Observable<Event>
  ) {
  }

  ngOnInit() {
    if (this.control) {
      combineLatest([this.inputBlur, this.control.statusChanges]).pipe(
        switchMap(([, status]) =>
          (this.isYandexCringe ? of(null).pipe(debounceTime(50)) : of(null)).pipe(
            tap(() => {
              if (this.checkConditions(this.control?.errors)) {
                this.display = 'block'
              } else {
                setTimeout(() => {
                  this.display = 'none'
                }, 200)
              }
            })
          )
        ),
        untilDestroyed(this)
      ).subscribe()
    }
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
