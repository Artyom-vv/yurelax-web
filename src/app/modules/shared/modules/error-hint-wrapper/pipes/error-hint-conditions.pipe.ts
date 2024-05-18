import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {map, combineLatest, Observable, tap} from "rxjs";
import {BaseComponentInputDirective} from "../../text-fields/directives/base-component-input.directive";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Pipe({
  name: 'errorHintConditions'
})
export class ErrorHintConditionsPipe implements PipeTransform {

  constructor(
    public baseInput: BaseComponentInputDirective
  ) {
  }

  get control() {
    return this.baseInput.baseDirective?.control as AbstractControl
  }

  checkCondition = (field: string): Observable<boolean> => {
    return this.control.statusChanges.pipe(
      map(() => {
        return Boolean(this.control?.errors?.[field])
      }),
      untilDestroyed(this)
    )
  }

  checkConditions(field: string | string[]) {
    if (Array.isArray(field)) {
      return combineLatest(field.map(this.checkCondition)).pipe(
        map(fields => fields.some(Boolean))
      )
    }
    return this.checkCondition(field)
  }

  transform(value: string | string[], ...args: unknown[]): Observable<boolean> {
    return this.checkConditions(value)
  }

}
