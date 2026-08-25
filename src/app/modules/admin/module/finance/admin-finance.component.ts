import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, finalize, forkJoin, of, tap} from 'rxjs';
import {AdminCommerceService, CommerceCurrencyReference} from '../../../shared/services/admin-commerce.service';
import {AdminFinanceService, FinancialApproval, FinancialApprovalStatus} from '../../../shared/services/admin-finance.service';
import {AdminPlayerEntry, AdminPlayersService} from '../../../shared/services/admin-players.service';

@Component({selector: 'yrx-admin-finance', templateUrl: './admin-finance.component.html',
  styleUrls: ['./admin-finance.component.scss'], standalone: false})
export class AdminFinanceComponent implements OnInit {
  approvals: FinancialApproval[] = [];
  players: AdminPlayerEntry[] = [];
  currencies: CommerceCurrencyReference[] = [];
  status: FinancialApprovalStatus = 'PENDING';
  loading = true;
  saving = false;
  decidingId: string | null = null;
  rejectionId: string | null = null;
  rejectionReason = '';
  readonly form = this.forms.group({playerId: ['', Validators.required], currencyCode: ['', Validators.required],
    amount: ['', [Validators.required, Validators.pattern(/^-?[1-9]\d*$/)]], reasonCode: ['ADMIN_ADJUSTMENT', Validators.required]});

  constructor(private readonly finance: AdminFinanceService, private readonly commerce: AdminCommerceService,
    private readonly playerApi: AdminPlayersService, private readonly forms: FormBuilder,
    private readonly snackbar: MatSnackBar) {}

  ngOnInit(): void { this.loadAll(); }

  loadAll(): void {
    this.loading = true;
    forkJoin({approvals: this.finance.list(this.status), references: this.commerce.references(),
      players: this.playerApi.players()}).pipe(tap(result => {
        this.approvals = result.approvals.items; this.currencies = result.references.currencies.filter(x => x.active);
        this.players = result.players;
      }), catchError(error => this.failure(error, 'Не удалось загрузить финансовую очередь')),
      finalize(() => this.loading = false)).subscribe();
  }

  filter(status: string): void { this.status = status as FinancialApprovalStatus; this.loadAll(); }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    const value = this.form.getRawValue();
    this.finance.create({kind: 'ADMIN_ADJUSTMENT', playerId: value.playerId!, currencyCode: value.currencyCode!,
      amount: value.amount!, reasonCode: value.reasonCode!}).pipe(tap(() => {
        this.snackbar.open('Операция отправлена. Рискованные суммы ждут второго администратора.', 'Закрыть', {duration: 5000});
        this.form.patchValue({amount: ''}); this.loadAll();
      }), catchError(error => this.failure(error, 'Не удалось создать операцию')),
      finalize(() => this.saving = false)).subscribe();
  }

  approve(item: FinancialApproval): void { this.decide(item, this.finance.approve(item.approvalRequestId), 'Операция подтверждена'); }
  beginReject(item: FinancialApproval): void { this.rejectionId = item.approvalRequestId; this.rejectionReason = ''; }
  cancelReject(): void { this.rejectionId = null; this.rejectionReason = ''; }
  reject(item: FinancialApproval): void {
    if (this.rejectionReason.trim().length < 3) return;
    this.decide(item, this.finance.reject(item.approvalRequestId, this.rejectionReason.trim()), 'Операция отклонена');
  }

  adjustment(item: FinancialApproval): FinancialAdjustmentView | null {
    return item.operation['kind'] === 'ADMIN_ADJUSTMENT' ? item.operation as unknown as FinancialAdjustmentView : null;
  }

  private decide(item: FinancialApproval, action: ReturnType<AdminFinanceService['approve']>, message: string): void {
    this.decidingId = item.approvalRequestId;
    action.pipe(tap(() => { this.snackbar.open(message, 'Закрыть', {duration: 3500}); this.cancelReject(); this.loadAll(); }),
      catchError(error => this.failure(error, 'Не удалось сохранить решение')),
      finalize(() => this.decidingId = null)).subscribe();
  }

  private failure(error: any, fallback: string) { this.snackbar.open(error?.error?.message ?? fallback, 'Закрыть', {duration: 6000}); return of(null); }
}

interface FinancialAdjustmentView {kind: 'ADMIN_ADJUSTMENT'; playerId: string; currencyCode: string; amount: string; reasonCode: string}
