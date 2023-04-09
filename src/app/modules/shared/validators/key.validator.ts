import {ValidatorFn, AbstractControl} from '@angular/forms';
import {ValidationErrors} from '@angular/forms';

export function KeyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = control.getRawValue();
    if (v) return v.split('').includes(' ') ? {notAllowedSymbol: true} : null;
    return null
  };
}
