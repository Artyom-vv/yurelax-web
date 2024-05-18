import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { debounceTime, map, Observable, of, switchMap, tap } from "rxjs";
import { UserService } from "../../platform/services/user.service";

export function ExistingUserValidator(userService: UserService, inverse: boolean = false): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap(() => {
        if (!control.parent) {
          return of(null);
        }
        const form = control.parent.getRawValue();
        const field = Object.keys(form).find(f => form[f] === control.value);

        if (!field) {
          return of(null);
        }

        return userService.checkUserExists({ [field]: control.value }).pipe(
          map((exists) => {
            const error = inverse ? exists[field as keyof Object] ? null : { notExist: true }
              : exists[field as keyof Object] ? { alreadyUse: true } : null;

            control.setErrors(error);
            return error;
          })
        );
      }),
    );
  };
}
