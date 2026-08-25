import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {catchError, finalize, forkJoin, of, tap} from 'rxjs';
import {PlayerWalletBalance, PlayerWalletTransaction} from '../profile-store/interfaces/commerce.interface';
import {PlatformCommerceService} from '../profile-store/services/platform-commerce.service';

@Component({
    selector: 'yrx-profile-wallet',
    templateUrl: './profile-wallet.component.html',
    styleUrls: ['./profile-wallet.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProfileWalletComponent implements OnInit {
  public wallets: PlayerWalletBalance[] = [];
  public transactions: PlayerWalletTransaction[] = [];
  public loading = true;
  public error = '';

  constructor(private readonly commerce: PlatformCommerceService) {}

  ngOnInit(): void {
    forkJoin({wallets: this.commerce.wallets(), transactions: this.commerce.walletTransactions()}).pipe(
      tap(result => {
        this.wallets = result.wallets.items;
        this.transactions = result.transactions.items;
      }),
      catchError(error => {
        this.error = error?.error?.message ?? 'Не удалось загрузить кошельки.';
        return of(null);
      }),
      finalize(() => this.loading = false),
    ).subscribe();
  }

  public amount(value: string, exponent: number): string {
    const negative = value.startsWith('-');
    const digits = negative ? value.slice(1) : value;
    if (exponent === 0) return `${negative ? '-' : ''}${digits}`;
    const padded = digits.padStart(exponent + 1, '0');
    const integer = padded.slice(0, -exponent);
    const fraction = padded.slice(-exponent).replace(/0+$/, '');
    return `${negative ? '-' : ''}${integer}${fraction ? `.${fraction}` : ''}`;
  }
}
