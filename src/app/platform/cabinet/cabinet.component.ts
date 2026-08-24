import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, combineLatest, map, of, startWith } from 'rxjs';
import {
  CabinetData,
  CommerceEntitlement,
  CommerceOffer,
  WebSessionState,
} from '../api/platform-api.models';
import { PlatformApiService } from '../api/platform-api.service';

type CabinetTab = 'store' | 'rights' | 'history';
interface CabinetView {
  loading: boolean;
  data?: CabinetData;
  session?: WebSessionState;
  error?: string;
}

@Component({
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Player-owned storefront, purchase ledger and effective-rights view. */
export class CabinetComponent {
  private readonly api = inject(PlatformApiService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly tab = signal<CabinetTab>('store');
  readonly view$ = combineLatest({ session: this.api.session(), data: this.api.cabinet() }).pipe(
    map(({ session, data }): CabinetView => ({ loading: false, data, session })),
    startWith<CabinetView>({ loading: true }),
    catchError(() => of<CabinetView>({ loading: false,
      error: 'Платформа временно не отдала данные. Обновите страницу через несколько секунд.' })),
  );

  setTab(tab: CabinetTab): void { this.tab.set(tab); }

  logout(session: WebSessionState): void {
    if (!session.csrfToken) return;
    this.api.logout(session.csrfToken).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => void this.router.navigate(['/login']),
      error: () => void this.router.navigate(['/login']),
    });
  }

  offerScope(offer: CommerceOffer): string { return offer.gameCode ? `Режим · ${offer.gameCode}` : 'Глобальный товар'; }

  offerPrice(offer: CommerceOffer): string {
    return offer.prices.length ? offer.prices.map((price) => `${price.amount} ${price.currencyCode}`).join(' / ') : 'Без цены';
  }

  eligibility(offer: CommerceOffer): string {
    if (!offer.eligibility || offer.eligibility.eligible) return 'Доступно сейчас';
    return offer.eligibility.reasons.map((reason) => this.reason(reason.code, reason.actual)).join(' · ');
  }

  activation(entitlement: CommerceEntitlement): string {
    if (entitlement.activationState.canActivate) return 'Можно активировать';
    const labels: Record<string, string> = {
      NOT_ACTIVATABLE: 'Постоянное право', ENTITLEMENT_INACTIVE: 'Право неактивно', ALREADY_ACTIVE: 'Уже действует',
      LIFETIME_LIMIT_REACHED: 'Лимит исчерпан', PERIOD_LIMIT_REACHED: 'Лимит периода исчерпан',
    };
    return labels[entitlement.activationState.blockedReason ?? ''] ?? 'Активация не требуется';
  }

  private reason(code: string, actual: string | null): string {
    const labels: Record<string, string> = {
      PROGRESSION_LEVEL_REQUIRED: 'Недостаточный уровень', STAT_THRESHOLD_REQUIRED: 'Не выполнено условие режима',
      GRANT_REQUIRED: 'Требуется другое право', PURCHASE_LIMIT_REACHED: 'Лимит покупок достигнут',
      NEGATED_REQUIREMENT_MATCHED: 'Условие несовместимо', REQUIREMENT_UNAVAILABLE: 'Условие пока недоступно',
    };
    return `${labels[code] ?? code}${actual ? ` (сейчас: ${actual})` : ''}`;
  }
}
