import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs';
import {MIN_PASSWORD_LENGTH} from '../../auth.constants';
import {CheckIfMatchingPasswordsValidator} from '../../validators/check-if-matching-passwords.validator';
import {PlatformAccountService} from '../../../shared/services/platform-account.service';

@Component({
  selector: 'yrx-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RecoverPasswordComponent implements OnInit {
  public form!: FormGroup;
  public dataLoading = false;
  public readonly MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH;

  constructor(
    private readonly accounts: PlatformAccountService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(256)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(256)]],
    }, {validators: [CheckIfMatchingPasswordsValidator('password', 'passwordRepeat')]} as AbstractControlOptions);
  }

  public recoverPassword(): void {
    if (this.form.invalid || this.dataLoading) return;
    this.dataLoading = true;
    this.accounts.resetPassword(this.form.getRawValue().password).pipe(
      finalize(() => { this.dataLoading = false; this.changeDetector.markForCheck(); }),
    ).subscribe({
      next: () => {
        this.snackBar.open('Пароль успешно изменён', 'Хорошо');
        this.router.navigate(['/auth/login']);
      },
      error: error => {
        this.snackBar.open(error.status === 401
          ? 'Сессия восстановления истекла. Запросите новый код.'
          : 'Не удалось изменить пароль. Попробуйте ещё раз.', 'Закрыть');
        if (error.status === 401) this.router.navigate(['/auth/which-email-recover']);
      },
    });
  }

  public cancel(): void { this.router.navigate(['/auth/login']); }
}
