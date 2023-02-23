import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {
  LOGIN_VALIDATION_PATTERN, MAX_LOGIN_LENGTH,
  MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH,
} from "../../auth.constants";
import {ExistingUserLoginValidator} from "../../validators/existing-user-login.validator";
import {UserService} from "../../../platform/services/user.service";

@Component({
  selector: 'yrx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;

  public MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH
  public MAX_LOGIN_LENGTH = MAX_LOGIN_LENGTH
  public MIN_LOGIN_LENGTH = MIN_LOGIN_LENGTH

  ngOnInit() {
    this.dataFields()
    this.initForms()
    this.watchForms()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public register(): void {
    this.dataLoading = true;
    this.subscriptions.push(
      this.authService.register(this.form.getRawValue()).pipe(
        tap((response) => {
          console.log(response)
          this.dataLoading = false;
        }),
        catchError(err => {
          this.dataLoading = false
          this.cdr.detectChanges()
          throw new Error(err);
        })
      ).subscribe()
    )
  }

  public checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
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

  private initForms(): void {
    this.form = this.fb.group({
      login: ["", [Validators.required, Validators.minLength(MIN_LOGIN_LENGTH), Validators.maxLength(MAX_LOGIN_LENGTH), Validators.pattern(LOGIN_VALIDATION_PATTERN)], [ExistingUserLoginValidator(this.userService)]],
      email: ["", [Validators.required, Validators.email]],
      userInvitedId: [null],
      password: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
      passwordRepeat: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
    }, {
      validators: [this.checkIfMatchingPasswords('password', 'passwordRepeat')]
    } as AbstractControlOptions)
  }

  private dataFields(): void {

  }

  private watchForms(): void {
    const passwordControl: AbstractControl = this.form.get('password')!;
  }

}
