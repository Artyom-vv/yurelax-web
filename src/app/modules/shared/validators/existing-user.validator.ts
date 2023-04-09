import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {UserService} from "../../platform/services/user.service";

export function ExistingUserValidator(userService: UserService, inverse: boolean = false): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const form = control.parent?.getRawValue();
    const field: string = Object.keys(form).find(field => form[field] === control.value)!
    return userService.checkUserExists({[field]: control.value}).pipe(map((value) => {
      if (inverse) return value[field as keyof Object] ? null : { notExist: true }
      return value[field as keyof Object] ? { alreadyUse: true } : null
    }));
  };
}
