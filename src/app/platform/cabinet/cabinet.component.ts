import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, map, of, startWith, switchMap } from 'rxjs';
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
  private readonly refresh = new BehaviorSubject<void>(undefined);
  readonly tab = signal<CabinetTab>('store');
  readonly busy = signal<string | null>(null);
  readonly notice = signal<string | null>(null);
  readonly view$ = combineLatest({ session: this.api.session(),
    data: this.refresh.pipe(switchMap(() => this.api.cabinet())) }).pipe(
    map(({ session, data }): CabinetView => ({ loading: false, data, session })),
    startWith<CabinetView>({ loading: true }),
    catchError(() => of<CabinetView>({ loading: false,
      error: 'Платформа временно не отдала данные. Обновите страницу через несколько секунд.' })),
  );

  setTab(tab: CabinetTab): void { this.tab.set(tab); }

  purchase(session: WebSessionState, offer: CommerceOffer, currencyCode: string): void {
    if (!session.csrfToken || offer.eligibility?.eligible === false || this.busy()) return;
    this.mutate(`purchase:${offer.code}`, this.api.purchase(session.csrfToken, offer.code, currencyCode),
      `Покупка «${offer.productName}» подтверждена платформой.`);
  }

  activateRight(session: WebSessionState, entitlement: CommerceEntitlement): void {
    if (!session.csrfToken || !entitlement.activationState.canActivate || this.busy()) return;
    this.mutate(`activation:${entitlement.id}`, this.api.activate(session.csrfToken, entitlement.id),
      `Право ${entitlement.entitlementKey} активировано.`);
  }

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

  private mutate(key: string, operation: ReturnType<PlatformApiService['purchase']>, success: string): void {
    this.busy.set(key);
    this.notice.set(null);
    operation.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.busy.set(null); this.notice.set(success); this.refresh.next(); },
      error: (error: { error?: { message?: unknown } }) => {
        this.busy.set(null);
        const message = error.error?.message;
        this.notice.set(typeof message === 'string' ? message : 'Операцию не удалось подтвердить. Повторите попытку.');
      },
    });
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
