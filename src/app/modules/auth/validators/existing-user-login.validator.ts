import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {UserService} from "../../platform/services/user.service";

export function ExistingUserLoginValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.checkUserExists(control.value).pipe(map((value) => {
      return value ? { loginExists: true } : null
    }));
  };
}
