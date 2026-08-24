import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs';
import {PlatformAccountService} from '../../../shared/services/platform-account.service';

@Component({
  selector: 'yrx-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EmailVerifyComponent implements OnInit {
  public operationId = '';
  public dataLoading = false;

  constructor(
    private readonly accounts: PlatformAccountService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.operationId = this.route.snapshot.queryParamMap.get('operationId') ?? '';
    if (!this.operationId) this.router.navigate(['/auth/register']);
  }

  onConfirm(code: number): void {
    if (this.dataLoading || !this.operationId) return;
    this.dataLoading = true;
    this.accounts.verifyRegistration(this.operationId, String(code).padStart(6, '0')).pipe(
      finalize(() => { this.dataLoading = false; this.changeDetector.markForCheck(); }),
    ).subscribe({
      next: () => {
        this.snackBar.open('Аккаунт подтверждён. Теперь можно войти.', 'Хорошо');
        this.router.navigate(['/auth/login']);
      },
      error: () => this.snackBar.open('Код неверен или уже истёк', 'Закрыть'),
    });
  }
}
