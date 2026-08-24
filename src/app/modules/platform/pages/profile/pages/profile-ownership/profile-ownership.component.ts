import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {catchError, finalize, forkJoin, of, tap} from 'rxjs';
import {CommerceEntitlement, CommercePurchase} from '../profile-store/interfaces/commerce.interface';
import {PlatformCommerceService} from '../profile-store/services/platform-commerce.service';

@Component({
    selector: 'yrx-profile-ownership',
    templateUrl: './profile-ownership.component.html',
    styleUrls: ['./profile-ownership.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProfileOwnershipComponent implements OnInit {
  public purchases: CommercePurchase[] = [];
  public entitlements: CommerceEntitlement[] = [];
  public loading = true;
  public activating: string | null = null;
  public error = '';
  public message = '';

  constructor(private readonly commerce: PlatformCommerceService) {}

  ngOnInit(): void { this.load(); }

  public activate(entitlement: CommerceEntitlement): void {
    this.activating = entitlement.id;
    this.error = '';
    this.message = '';
    this.commerce.activate(entitlement.id).pipe(
      tap(() => {
        this.message = `Право ${entitlement.entitlementKey} активировано.`;
        this.load(false);
      }),
      catchError(error => {
        this.error = error?.error?.message ?? 'Не удалось активировать право.';
        return of(null);
      }),
      finalize(() => this.activating = null),
    ).subscribe();
  }

  public activationHint(entitlement: CommerceEntitlement): string {
    const state = entitlement.activationState;
    if (state.canActivate) return 'Можно активировать сейчас';
    switch (state.blockedReason) {
      case 'NOT_ACTIVATABLE': return 'Постоянное право — активация не требуется';
      case 'ALREADY_ACTIVE': return `Уже активно до ${state.activeActivation?.expiresAt ?? 'окончания периода'}`;
      case 'PERIOD_LIMIT_REACHED': return `Лимит периода исчерпан${state.periodResetsAt ? ` до ${state.periodResetsAt}` : ''}`;
      case 'LIFETIME_LIMIT_REACHED': return 'Лимит активаций исчерпан';
      case 'ENTITLEMENT_INACTIVE': return 'Право больше не активно';
      default: return 'Активация сейчас недоступна';
    }
  }

  private load(showLoading = true): void {
    if (showLoading) this.loading = true;
    forkJoin({purchases: this.commerce.purchases(), entitlements: this.commerce.entitlements()}).pipe(
      tap(result => {
        this.purchases = result.purchases.items;
        this.entitlements = result.entitlements.items;
      }),
      catchError(error => {
        this.error = error?.error?.message ?? 'Не удалось загрузить покупки и права.';
        return of(null);
      }),
      finalize(() => this.loading = false),
    ).subscribe();
  }
}
