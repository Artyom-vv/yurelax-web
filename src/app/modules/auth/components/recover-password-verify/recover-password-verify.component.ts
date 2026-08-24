import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs';
import {PlatformAccountService} from '../../../shared/services/platform-account.service';

@Component({
  selector: 'yrx-recover-password-verify',
  templateUrl: './recover-password-verify.component.html',
  styleUrls: ['./recover-password-verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RecoverPasswordVerifyComponent implements OnInit {
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
    if (!this.operationId) this.router.navigate(['/auth/which-email-recover']);
  }

  onConfirm(code: number): void {
    if (this.dataLoading || !this.operationId) return;
    this.dataLoading = true;
    this.accounts.verifyPasswordRecovery(this.operationId, String(code).padStart(6, '0')).pipe(
      finalize(() => { this.dataLoading = false; this.changeDetector.markForCheck(); }),
    ).subscribe({
      next: () => this.router.navigate(['/auth/recover-password']),
      error: () => this.snackBar.open('Код неверен или уже истёк', 'Закрыть'),
    });
  }
}
