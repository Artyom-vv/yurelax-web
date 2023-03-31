import {FormGroup} from "@angular/forms";

export function CheckIfMatchingPasswordsValidator(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    let passwordInput = group.controls[passwordKey],
      passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value || !passwordInput.value && !passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({notEquivalent: true})
    } else {
      return passwordConfirmationInput.setErrors(null);
    }
  }
}
