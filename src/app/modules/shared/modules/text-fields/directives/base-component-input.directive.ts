import {
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  InjectionToken,
  QueryList,
  Renderer2
} from '@angular/core';
import {BaseInputDirective} from "./base-input.directive";
import {
  ErrorHintFieldComponent
} from "../../error-hint-wrapper/components/error-hint-field/error-hint-field.component";
import {IconLeftDirective} from "../../../directives/icon-left.directive";
import {IconRightDirective} from "../../../directives/icon-right.directive";
import {LabelDirective} from "../../../directives/label.directive";
import {first, fromEvent, map, Observable, of, switchMap} from "rxjs";

export const BASE_COMPONENT_INPUT_BLUR = new InjectionToken('BASE_COMPONENT_INPUT_BLUR', {
  providedIn: 'root',
  factory: () => {
    // Эта фабрика будет переопределена в провайдере компонента
    return new Observable<Event>();
  }
});

export const BASE_COMPONENT_INPUT_TOUCHED = new InjectionToken('BASE_COMPONENT_INPUT_TOUCHED', {
  providedIn: 'root',
  factory: () => {
    // Эта фабрика будет переопределена в провайдере компонента
    return new Observable<boolean>();
  }
});

const checkElement = (directive: BaseComponentInputDirective, callback: (elementRef: ElementRef<HTMLElement>) => void) => {
  if (directive.baseDirective?.element?.nativeElement) {
    callback(directive.baseDirective.element)
  } else {
    requestAnimationFrame(() => checkElement(directive, callback));
  }
};

@Directive({
  selector: '[yrxBaseComponentInput]',
  standalone: true,
  providers: [
    {
      provide: BASE_COMPONENT_INPUT_BLUR,
      useFactory: (directive: BaseComponentInputDirective) => {
        return new Observable<Event>(observer => {
          checkElement(directive, ({nativeElement}) => {
            fromEvent(nativeElement, 'blur').subscribe(observer);
          });
        });
      },
      deps: [BaseComponentInputDirective]
    },
    {
      provide: BASE_COMPONENT_INPUT_TOUCHED,
      useFactory: (blur: Observable<Event>, directive: BaseComponentInputDirective) => {
        return new Observable<boolean>((observer) => {
          of(Boolean(directive.baseDirective.control?.touched)).pipe(
            switchMap((touched) => {
              if (touched) {
                return of(touched)
              }
              return blur.pipe(
                first(),
                map(() => {
                  return true
                })
              )
            })
          ).subscribe(observer)
        })
      },
      deps: [BASE_COMPONENT_INPUT_BLUR, BaseComponentInputDirective]
    }
  ]
})
export class BaseComponentInputDirective {

  @ContentChild(BaseInputDirective) baseDirective!: BaseInputDirective
  @ContentChild(LabelDirective) label?: LabelDirective
  @ContentChild(IconLeftDirective) iconLeft?: IconLeftDirective
  @ContentChild(IconRightDirective) iconRight?: IconRightDirective
  @ContentChildren(ErrorHintFieldComponent) hints?: QueryList<ErrorHintFieldComponent>

  constructor(
  ) { }
}
