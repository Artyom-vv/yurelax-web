import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MailerService} from "../../../shared/services/mailer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {finalize, first, Subscription, switchMap, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {MIN_PASSWORD_LENGTH} from "../../auth.constants";
import {CheckIfMatchingPasswordsValidator} from "../../validators/check-if-matching-passwords.validator";
import {AuthStore} from "../../store/auth.store";

@Component({
  selector: 'yrx-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private mailerService: MailerService,
    private _snackBar: MatSnackBar,
    private authStore: AuthStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;

  public MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH

  ngOnInit() {
    this.initForms()
    this.dataFields()
    this.watchForms()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public recoverPassword(): void {
    this.dataLoading = true;
    this.subscriptions.push(
      this.authStore.recoveringPasswordEmail$.pipe(
        first(),
        switchMap((email) => this.authService.recoverPassword({email, ...this.form.getRawValue()})),
        tap(() => {
          this.authStore.setIsRecoveringPasswordStep(null);
          this._snackBar.open('Пароль успешно изменён', 'Хорошо')
          this.router.navigate(['/auth/login'])
        }),
        finalize(() => {
          this.dataLoading = false;
        }),
        catchError(err => {
          this._snackBar.open(err.error.message, 'Закрыть')
          throw new Error(err);
        })
      ).subscribe()
    )
  }

  private initForms(): void {
    this.form = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
      passwordRepeat: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
    }, {
      validators: [CheckIfMatchingPasswordsValidator('password', 'passwordRepeat')]
    } as AbstractControlOptions)
  }

  private dataFields(): void {
  }

  private watchForms(): void {
  }

  public cancel() {
    this.authStore.setIsRecoveringPasswordStep(null);
    this.router.navigate(['/auth/login'])
  }
}
