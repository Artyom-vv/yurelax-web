import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {filter, finalize, map, Subscription, switchMap, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {
  LOGIN_VALIDATION_PATTERN, MAX_LOGIN_LENGTH,
  MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH,
} from "../../auth.constants";
import {ExistingUserValidator} from "../../../shared/validators/existing-user.validator";
import {UserService} from "../../../platform/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MailerService} from "../../../shared/services/mailer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PersistenceService} from "../../../shared/services/persistence.service";
import {AppStore} from "../../../../store/app.store";
import {CheckIfMatchingPasswordsValidator} from "../../validators/check-if-matching-passwords.validator";

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
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private mailerService: MailerService,
    private _snackBar: MatSnackBar,
    private persistenceService: PersistenceService,
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;

  public MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH
  public MAX_LOGIN_LENGTH = MAX_LOGIN_LENGTH
  public MIN_LOGIN_LENGTH = MIN_LOGIN_LENGTH

  ngOnInit() {
    this.initForms()
    this.dataFields()
    this.watchForms()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public register(): void {
    this.dataLoading = true;
    this.subscriptions.push(
      this.authService.register(this.form.getRawValue()).pipe(
        switchMap((res) => this.mailerService.confirmEmailCode().pipe(map(({operationId}) => ({res, operationId})))),
        tap(({res,operationId}) => {
          this._snackBar.open('Код отправлен на вашу почту', 'Хорошо')
          this.router.navigate(['/auth/email-verify'], {queryParams: {operationId}})
          this.appStore.setIsLogged(true);
        }),
        finalize(() => {
          this.dataLoading = false;
        }),
        catchError(err => {
          this.cdr.detectChanges()
          throw new Error(err);
        })
      ).subscribe()
    )
  }

  private initForms(): void {
    this.form = this.fb.group({
      login: ["", [Validators.required, Validators.minLength(MIN_LOGIN_LENGTH), Validators.maxLength(MAX_LOGIN_LENGTH), Validators.pattern(LOGIN_VALIDATION_PATTERN)], [ExistingUserValidator(this.userService)]],
      email: ["", [Validators.required, Validators.email], [ExistingUserValidator(this.userService)]],
      userInvitedId: [null],
      password: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
      passwordRepeat: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
    }, {
      validators: [CheckIfMatchingPasswordsValidator('password', 'passwordRepeat')]
    } as AbstractControlOptions)
    const userInvitedId: string = this.persistenceService.get('userInvitedId')
    if (userInvitedId) this.form.patchValue({userInvitedId})
  }

  private dataFields(): void {
    this.subscriptions.push(
      this.route.queryParams.pipe(
        filter((data) => data['ref']),
        switchMap((data) => this.userService.getUser(data['ref'])),
        tap((user) => {
          this.persistenceService.set('userInvitedId', user.userId);
          this.form.patchValue({userInvitedId: user.userId}, {emitEvent: false});
          this._snackBar.open('Вы были приглашены ' + user.login, 'Хорошо')
        })
      ).subscribe()
    )
  }

  private watchForms(): void {
  }

}
