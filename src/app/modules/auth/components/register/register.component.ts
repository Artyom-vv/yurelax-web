import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs';
import {LOGIN_VALIDATION_PATTERN, MAX_LOGIN_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH} from '../../auth.constants';
import {CheckIfMatchingPasswordsValidator} from '../../validators/check-if-matching-passwords.validator';
import {PlatformAccountService} from '../../../shared/services/platform-account.service';

@Component({
  selector: 'yrx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public dataLoading = false;
  public readonly MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH;
  public readonly MAX_LOGIN_LENGTH = MAX_LOGIN_LENGTH;
  public readonly MIN_LOGIN_LENGTH = MIN_LOGIN_LENGTH;

  constructor(
    private readonly accounts: PlatformAccountService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(MIN_LOGIN_LENGTH),
        Validators.maxLength(MAX_LOGIN_LENGTH), Validators.pattern(LOGIN_VALIDATION_PATTERN)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(256)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(256)]],
    }, {validators: [CheckIfMatchingPasswordsValidator('password', 'passwordRepeat')]} as AbstractControlOptions);
  }

  public register(): void {
    if (this.form.invalid || this.dataLoading) return;
    const value = this.form.getRawValue();
    this.dataLoading = true;
    this.accounts.register({username: value.login, email: value.email, password: value.password}).pipe(
      finalize(() => { this.dataLoading = false; this.changeDetector.markForCheck(); }),
    ).subscribe({
      next: ({operationId}) => {
        this.snackBar.open('Код подтверждения отправлен на почту', 'Хорошо');
        this.router.navigate(['/auth/email-verify'], {queryParams: {operationId}});
      },
      error: error => this.snackBar.open(error.status === 409
        ? 'Такой логин или e-mail уже используется'
        : 'Не удалось начать регистрацию. Попробуйте ещё раз.', 'Закрыть'),
    });
  }
}
