import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs';
import {PlatformAccountService} from '../../../shared/services/platform-account.service';

@Component({
  selector: 'yrx-which-email-recover',
  templateUrl: './which-email-recover.component.html',
  styleUrls: ['./which-email-recover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class WhichEmailRecoverComponent implements OnInit {
  public form!: FormGroup;
  public dataLoading = false;

  constructor(
    private readonly accounts: PlatformAccountService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({email: ['', [Validators.required, Validators.email]]});
  }

  public send(): void {
    if (this.form.invalid || this.dataLoading) return;
    this.dataLoading = true;
    this.accounts.beginPasswordRecovery(this.form.getRawValue().email).pipe(
      finalize(() => { this.dataLoading = false; this.changeDetector.markForCheck(); }),
    ).subscribe({
      next: ({operationId}) => {
        this.snackBar.open('Если аккаунт существует, код отправлен на его почту', 'Хорошо');
        this.router.navigate(['/auth/recover-password-verify'], {queryParams: {operationId}});
      },
      error: () => this.snackBar.open('Не удалось начать восстановление. Попробуйте ещё раз.', 'Закрыть'),
    });
  }
}
