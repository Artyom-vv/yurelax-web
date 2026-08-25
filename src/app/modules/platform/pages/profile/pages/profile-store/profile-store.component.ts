import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {catchError, finalize, forkJoin, of, tap} from 'rxjs';
import {PlatformGameCatalogService, PublicGame} from '../../../../../shared/services/platform-game-catalog.service';
import {platformErrorMessage} from '../../../../../shared/interfaces/platform-error-message';
import {CommerceEligibilityReason, CommerceOffer, PlayerWalletBalance} from './interfaces/commerce.interface';
import {StoreOfferGroup, StoreOfferView, StorePurchaseRequest} from './interfaces/store-offer.interface';
import {PlatformCommerceService} from './services/platform-commerce.service';

interface StoreFilterOption { code: string; name: string; icon: string; }

@Component({
  selector: 'yrx-profile-store',
  templateUrl: './profile-store.component.html',
  styleUrls: ['./profile-store.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class ProfileStoreComponent implements OnInit {
  offers: StoreOfferView[] = [];
  scopeOptions: StoreFilterOption[] = [];
  currencyOptions: StoreFilterOption[] = [];
  loading = true;
  purchasingOffer: string | null = null;
  message = '';
  error = '';
  search = '';
  selectedScope = 'all';
  selectedCurrency = 'all';
  availableOnly = false;

  constructor(
    private readonly commerce: PlatformCommerceService,
    private readonly games: PlatformGameCatalogService,
  ) {}

  ngOnInit(): void { this.loadStorefront(); }

  get groups(): StoreOfferGroup[] {
    const query = this.search.trim().toLocaleLowerCase('ru');
    const visible = this.offers.filter(offer => {
      const matchesSearch = !query || [offer.name, offer.description, offer.productCode, offer.offerCode, offer.scopeName]
        .some(value => value.toLocaleLowerCase('ru').includes(query));
      const matchesScope = this.selectedScope === 'all'
        || (this.selectedScope === 'global' ? offer.gameCode === null : offer.gameCode === this.selectedScope);
      const matchesCurrency = this.selectedCurrency === 'all'
        || offer.prices.some(price => price.currencyCode === this.selectedCurrency);
      const canBuy = !this.availableOnly || (offer.eligible && offer.prices.some(price => price.canAfford !== false));
      return matchesSearch && matchesScope && matchesCurrency && canBuy;
    });

    const grouped = new Map<string, StoreOfferGroup>();
    for (const offer of visible) {
      const key = offer.gameCode ?? 'global';
      const group = grouped.get(key) ?? {
        key,
        name: offer.scopeName,
        description: offer.scopeDescription,
        icon: offer.scopeIcon,
        offers: [],
      };
      group.offers.push(offer);
      grouped.set(key, group);
    }
    return [...grouped.values()].sort((left, right) => left.key === 'global' ? -1 : right.key === 'global' ? 1 : left.name.localeCompare(right.name, 'ru'));
  }

  get resultCount(): number { return this.groups.reduce((count, group) => count + group.offers.length, 0); }

  setScope(code: string): void { this.selectedScope = code; }
  setCurrency(code: string): void { this.selectedCurrency = code; }
  updateSearch(event: Event): void { this.search = (event.target as HTMLInputElement).value; }

  purchase(request: StorePurchaseRequest): void {
    const offer = this.offers.find(item => item.offerCode === request.offerCode);
    this.purchasingOffer = request.offerCode;
    this.message = '';
    this.error = '';
    this.commerce.purchase(request.offerCode, request.currencyCode).pipe(
      tap(result => {
        if (result.replayed) this.message = 'Эта покупка уже обработана. Повторного списания не было.';
        else if (offer?.fulfillmentRequired) this.message = 'Покупка подтверждена. Право сохранено в аккаунте и передано игровому модулю на выдачу.';
        else this.message = 'Покупка подтверждена. Новое право уже доступно в вашем аккаунте.';
        this.loadStorefront(false);
      }),
      catchError(error => {
        this.error = platformErrorMessage(error, 'Не удалось выполнить покупку. Проверьте условия и попробуйте ещё раз.');
        return of(null);
      }),
      finalize(() => this.purchasingOffer = null),
    ).subscribe();
  }

  private loadStorefront(showLoading = true): void {
    if (showLoading) this.loading = true;
    forkJoin({
      storefront: this.commerce.storefront(),
      wallets: this.commerce.wallets(),
      games: this.games.list().pipe(catchError(() => of({items: []}))),
    }).pipe(
      tap(response => {
        const wallets = new Map(response.wallets.items.map(wallet => [wallet.currencyCode, wallet]));
        const games = new Map(response.games.items.map(game => [game.code, game]));
        this.offers = response.storefront.items.map(offer => this.card(offer, wallets, games));
        this.scopeOptions = this.buildScopeOptions(response.games.items, this.offers);
        this.currencyOptions = response.wallets.items.map(wallet => ({code: wallet.currencyCode, name: wallet.displayName, icon: wallet.iconKey}));
      }),
      catchError(error => {
        this.error = platformErrorMessage(error, 'Каталог сейчас недоступен. Попробуйте обновить страницу позже.');
        return of(null);
      }),
      finalize(() => this.loading = false),
    ).subscribe();
  }

  private buildScopeOptions(games: PublicGame[], offers: StoreOfferView[]): StoreFilterOption[] {
    const used = new Set(offers.flatMap(offer => offer.gameCode ? [offer.gameCode] : []));
    const gameOptions = games.filter(game => used.has(game.code)).map(game => ({code: game.code, name: game.name, icon: game.presentation.icon || 'joystick'}));
    for (const code of used) if (!gameOptions.some(option => option.code === code)) gameOptions.push({code, name: code, icon: 'joystick'});
    return [{code: 'global', name: 'Весь сервер', icon: 'boxes'}, ...gameOptions];
  }

  private card(offer: CommerceOffer, wallets: Map<string, PlayerWalletBalance>, games: Map<string, PublicGame>): StoreOfferView {
    const game = offer.gameCode ? games.get(offer.gameCode) : undefined;
    const eligibility = offer.eligibility ?? {eligible: true, reasons: []};
    return {
      name: offer.productName,
      description: offer.productDescription,
      offerCode: offer.code,
      productCode: offer.productCode,
      productKind: this.productKind(offer.productKind),
      gameCode: offer.gameCode,
      scopeName: game?.name ?? (offer.gameCode ?? 'Весь сервер'),
      scopeDescription: game?.presentation.description ?? (offer.gameCode ? 'Товар игрового режима' : 'Действует во всех поддерживающих модулях'),
      scopeIcon: game?.presentation.icon || (offer.gameCode ? 'joystick' : 'boxes'),
      prices: offer.prices.map(price => {
        const wallet = wallets.get(price.currencyCode);
        return {...price, displayName: wallet?.displayName ?? price.currencyCode, iconKey: wallet?.iconKey ?? 'box', available: wallet?.available ?? null, canAfford: wallet ? this.canAfford(wallet.available, price.amount) : null};
      }),
      eligible: eligibility.eligible,
      eligibilityText: eligibility.reasons.map(reason => this.reason(reason)).join(' · '),
      details: offer.grants.map(grant => {
        const effectiveGameCode = grant.gameCode ?? offer.gameCode;
        const scope = effectiveGameCode ? `для режима ${games.get(effectiveGameCode)?.name ?? effectiveGameCode}` : 'для всего сервера';
        const delivery = grant.deliveryMode === 'ENTITLEMENT' ? 'право начинает действовать сразу' : 'результат выдаёт подключённый игровой модуль';
        const description = grant.capabilityDescription.replace(/[.!?]+$/, '');
        return `${grant.capabilityName} — ${description}. Область: ${scope}; ${delivery}.`;
      }),
      fulfillmentRequired: offer.grants.some(grant => grant.deliveryMode === 'FULFILLMENT'),
    };
  }

  private canAfford(available: string, price: string): boolean {
    try { return BigInt(available) >= BigInt(price); } catch { return false; }
  }

  private productKind(kind: CommerceOffer['productKind']): string {
    return ({PERMISSION: 'Право', ITEM: 'Предмет', REWARD_ACCESS: 'Доступ к наградам', CUSTOM: 'Особый товар'})[kind];
  }

  private reason(reason: CommerceEligibilityReason): string {
    const requirement = reason.requirement;
    switch (reason.code) {
      case 'PROGRESSION_LEVEL_REQUIRED': return `Нужен уровень ${requirement['minimumLevel']}, сейчас ${reason.actual ?? 'нет данных'}`;
      case 'STAT_THRESHOLD_REQUIRED': return `Нужно значение ${requirement['minimum']}, сейчас ${reason.actual ?? 'нет данных'}`;
      case 'GRANT_REQUIRED': return 'Сначала получите необходимое право';
      case 'PURCHASE_LIMIT_REACHED': return `Достигнут лимит покупок: ${requirement['maximum']}`;
      case 'NEGATED_REQUIREMENT_MATCHED': return 'У вас уже есть несовместимое право';
      default: return 'Платформа пока не может подтвердить условие покупки';
    }
  }
}
