import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {catchError, finalize, of, tap} from 'rxjs';
import {CommerceEligibilityReason, CommerceOffer} from './interfaces/commerce.interface';
import {SubscriptionPurchaseRequest, SubscriptionRes} from './interfaces/subscription.interface';
import {PlatformCommerceService} from './services/platform-commerce.service';

const CARD_THEMES = [
  {color: '#FFD071', blocks: ['gold-block/3.png', 'gold-block/2.png', 'gold-block/4.png']},
  {color: '#96C2EE', blocks: ['diamond-block/1.png', 'diamond-block/1.png', 'diamond-block/4.png']},
  {color: '#F28A8E', blocks: ['nether-block/2.png', 'nether-block/2.png', 'nether-block/3.png']},
] as const;

@Component({
    selector: 'yrx-profile-store',
    templateUrl: './profile-store.component.html',
    styleUrls: ['./profile-store.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProfileStoreComponent implements OnInit {
  public subscriptions: SubscriptionRes[] = [];
  public step = 0;
  public subscriptionsPerPage = 3;
  public indexes: number[] = [];
  public loading = true;
  public purchasingOffer: string | null = null;
  public message = '';
  public error = '';

  constructor(private readonly commerce: PlatformCommerceService) {}

  ngOnInit(): void {
    this.loadStorefront();
  }

  get totalSubscriptions(): number {
    return this.subscriptions.length;
  }

  offset(amount: number): void {
    const lastStart = Math.max(0, this.totalSubscriptions - this.subscriptionsPerPage);
    const nextStep = Math.min(Math.max(0, this.step + amount), lastStart);
    if (nextStep === this.step) return;
    this.step = nextStep;
    this.updateIndexes();
  }

  next(): void { this.offset(1); }
  prev(): void { this.offset(-1); }

  purchase(request: SubscriptionPurchaseRequest): void {
    this.purchasingOffer = request.offerCode;
    this.message = '';
    this.error = '';
    this.commerce.purchase(request.offerCode, request.currencyCode).pipe(
      tap(result => {
        this.message = result.replayed
          ? 'Покупка уже была обработана — повторное списание не выполнено.'
          : `Покупка подтверждена. Создано прав: ${result.entitlements.length}.`;
        this.loadStorefront(false);
      }),
      catchError(error => {
        this.error = error?.error?.message ?? 'Не удалось выполнить покупку. Попробуйте ещё раз.';
        return of(null);
      }),
      finalize(() => this.purchasingOffer = null)
    ).subscribe();
  }

  private loadStorefront(showLoading = true): void {
    if (showLoading) this.loading = true;
    this.commerce.storefront().pipe(
      tap(response => {
        this.subscriptions = response.items.map((offer, index) => this.card(offer, index));
        this.step = Math.min(this.step, Math.max(0, this.totalSubscriptions - this.subscriptionsPerPage));
        this.updateIndexes();
      }),
      catchError(error => {
        this.error = error?.error?.message ?? 'Каталог сейчас недоступен.';
        return of(null);
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  private updateIndexes(): void {
    const visible = Math.min(this.subscriptionsPerPage, Math.max(0, this.totalSubscriptions - this.step));
    this.indexes = Array.from({length: visible}, (_, index) => this.step + index);
  }

  private card(offer: CommerceOffer, index: number): SubscriptionRes {
    const theme = CARD_THEMES[index % CARD_THEMES.length];
    const eligibility = offer.eligibility ?? {eligible: true, reasons: []};
    return {
      name: offer.productName,
      offerCode: offer.code,
      productCode: offer.productCode,
      gameCode: offer.gameCode,
      prices: offer.prices,
      color: theme.color,
      decorationFirst: `assets/content/blocks/${theme.blocks[0]}`,
      decorationSecond: `assets/content/blocks/${theme.blocks[1]}`,
      decorationThird: `assets/content/blocks/${theme.blocks[2]}`,
      information: [[{text: offer.productDescription, weight: 'regular'}]],
      eligible: eligibility.eligible,
      eligibilityText: eligibility.reasons.map(reason => this.reason(reason)).join(' · '),
      details: offer.grants.map(grant => {
        const scope = grant.gameCode ? `режим ${grant.gameCode}` : 'весь сервер';
        const delivery = grant.deliveryMode === 'ENTITLEMENT' ? 'Доступ сохраняется в аккаунте' : 'Выдаётся игровым модулем';
        return `${grant.capabilityName} — ${grant.capabilityDescription} · ${scope} · ${delivery}`;
      })
    };
  }

  private reason(reason: CommerceEligibilityReason): string {
    const requirement = reason.requirement;
    switch (reason.code) {
      case 'PROGRESSION_LEVEL_REQUIRED':
        return `Нужен уровень ${requirement['minimumLevel']} (${requirement['progressionCode']}), сейчас ${reason.actual ?? 'нет данных'}`;
      case 'STAT_THRESHOLD_REQUIRED':
        return `Нужно ${requirement['minimum']} по показателю ${requirement['statCode']}, сейчас ${reason.actual ?? 'нет данных'}`;
      case 'GRANT_REQUIRED':
        return `Требуется право ${requirement['grantKey']}`;
      case 'PURCHASE_LIMIT_REACHED':
        return `Достигнут лимит покупок: ${requirement['maximum']}`;
      case 'NEGATED_REQUIREMENT_MATCHED':
        return 'Условие несовместимости уже выполнено';
      default:
        return 'Платформа пока не может подтвердить условие покупки';
    }
  }
}
