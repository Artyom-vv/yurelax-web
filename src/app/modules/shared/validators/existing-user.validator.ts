import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import {debounceTime, map, Observable, switchMap, catchError, of, finalize} from "rxjs";
import { UserService } from "../../platform/services/user.service";

export function ExistingUserValidator(userService: UserService, inverse: boolean = false): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value
    if (!value) {
      return of(null);
    }
    const form = control.parent?.getRawValue();
    const field = Object.keys(form || {}).find(f => form[f] === value);

    if (!field) {
      return of(null);
    }

    return userService.checkUserExists({ [field]: value }).pipe(
      map((exists) => {
        const error = inverse ? !exists[field as keyof Object] ? { notExist: true } : null
          : exists[field as keyof Object] ? { alreadyUse: true } : null;
        return error;
      }),
      catchError((err, caught) => {
        console.log(err)
        return caught
      }),
      finalize(() => {
        control.markAsPristine()
      })
    );
  };
}
