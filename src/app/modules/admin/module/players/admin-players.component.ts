import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, finalize, forkJoin, of, tap} from 'rxjs';
import {
  AdminEntitlement, AdminPlayerEntry, AdminPlayerStatistic, AdminPlayersService,
  AdminPurchase, AdminRewardReceipt, AdminTimelineItem,
} from '../../../shared/services/admin-players.service';
import {commercePaymentLabel} from '../../../shared/interfaces/commerce-acquisition.interface';

type PlayerSection = 'overview' | 'rewards' | 'statistics' | 'commerce' | 'timeline';

@Component({
  selector: 'yrx-admin-players',
  templateUrl: './admin-players.component.html',
  styleUrls: ['./admin-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AdminPlayersComponent implements OnInit {
  public readonly purchaseLabel = commercePaymentLabel;
  public search = '';
  public gameCode = '';
  public timelineScope = 'ALL';
  public players: AdminPlayerEntry[] = [];
  public selected: AdminPlayerEntry | null = null;
  public section: PlayerSection = 'overview';
  public statistics: AdminPlayerStatistic[] = [];
  public rewards: AdminRewardReceipt[] = [];
  public purchases: AdminPurchase[] = [];
  public entitlements: AdminEntitlement[] = [];
  public timeline: AdminTimelineItem[] = [];
  public searching = false;
  public loading = false;

  constructor(private readonly api: AdminPlayersService, private readonly snackBar: MatSnackBar) {}

  ngOnInit(): void { this.find(); }

  public find(): void {
    this.searching = true;
    this.api.players(this.search.trim() || undefined).pipe(
      tap(players => {
        this.players = players;
        if (this.selected) this.selected = players.find(player => player.playerId === this.selected?.playerId) ?? null;
      }),
      catchError(error => this.failure(error, 'Не удалось загрузить реестр игроков')),
      finalize(() => this.searching = false),
    ).subscribe();
  }

  public select(player: AdminPlayerEntry): void {
    this.selected = player;
    this.section = 'overview';
    this.load();
  }

  public show(section: PlayerSection): void { this.section = section; }

  public applyGame(): void {
    if (!this.selected) return;
    this.loading = true;
    forkJoin({
      statistics: this.api.statistics(this.selected.playerId, this.gameCode.trim() || undefined)
        .pipe(catchError(() => of({playerId: this.selected!.playerId, items: []}))),
      rewards: this.api.rewards(this.selected.playerId, this.gameCode.trim() || undefined)
        .pipe(catchError(() => of({items: []}))),
    }).pipe(
      tap(result => { this.statistics = result.statistics.items; this.rewards = result.rewards.items; }),
      finalize(() => this.loading = false),
    ).subscribe();
  }

  public applyTimelineScope(): void {
    if (!this.selected) return;
    this.loading = true;
    this.api.timeline(this.selected.playerId, this.timelineScope).pipe(
      tap(result => this.timeline = result.items),
      catchError(error => this.failure(error, 'Не удалось загрузить историю игрока')),
      finalize(() => this.loading = false),
    ).subscribe();
  }

  public expiry(value: string | null): string { return value ? `до ${this.date(value)}` : 'бессрочно'; }
  public date(value: string): string { return new Intl.DateTimeFormat('ru-RU', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(value)); }

  public entitlementStatus(value: string): string {
    return ({ACTIVE: 'Активно', CONSUMED: 'Использовано', REVOKED: 'Отозвано'} as Record<string, string>)[value] ?? value;
  }

  public activationSummary(right: AdminEntitlement): string {
    const state = right.activationState;
    if (state.activeActivation) return `Запущено до ${this.date(state.activeActivation.expiresAt)}`;
    if (state.canActivate) return 'Игрок может активировать';
    const reasons: Record<string, string> = {NOT_ACTIVATABLE: 'Не требует активации', ENTITLEMENT_INACTIVE: 'Право неактивно',
      ALREADY_ACTIVE: 'Уже запущено', LIFETIME_LIMIT_REACHED: 'Лимит активаций исчерпан',
      PERIOD_LIMIT_REACHED: `Следующая активация ${state.periodResetsAt ? this.date(state.periodResetsAt) : 'позже'}`};
    return reasons[state.blockedReason ?? ''] ?? 'Активация недоступна';
  }

  public timelineSummary(item: AdminTimelineItem): string {
    const preferred = ['title', 'name', 'statCode', 'rewardCode', 'currencyCode', 'reasonCode', 'eventCode', 'amount', 'value'];
    const facts = preferred.flatMap(key => item.details[key] === undefined ? [] : [`${this.detailLabel(key)}: ${String(item.details[key])}`]);
    return facts.length ? facts.join(' · ') : 'Подробности сохранены в аудите платформы';
  }

  private load(): void {
    if (!this.selected) return;
    this.loading = true;
    const playerId = this.selected.playerId;
    forkJoin({
      statistics: this.api.statistics(playerId).pipe(catchError(() => of({playerId, items: []}))),
      rewards: this.api.rewards(playerId).pipe(catchError(() => of({items: []}))),
      purchases: this.api.purchases(playerId).pipe(catchError(() => of({items: []}))),
      entitlements: this.api.entitlements(playerId).pipe(catchError(() => of({items: []}))),
      timeline: this.api.timeline(playerId).pipe(catchError(() => of({items: []}))),
    }).pipe(
      tap(result => {
        this.statistics = result.statistics.items;
        this.rewards = result.rewards.items;
        this.purchases = result.purchases.items;
        this.entitlements = result.entitlements.items;
        this.timeline = result.timeline.items;
      }),
      finalize(() => this.loading = false),
    ).subscribe();
  }

  private detailLabel(key: string): string {
    return ({title: 'Событие', name: 'Название', statCode: 'Статистика', rewardCode: 'Награда',
      currencyCode: 'Валюта', reasonCode: 'Причина', eventCode: 'Событие', amount: 'Сумма', value: 'Значение'} as Record<string, string>)[key] ?? key;
  }

  private failure(error: any, fallback: string) {
    this.snackBar.open(error?.error?.message ?? fallback, 'Закрыть');
    return of(null);
  }
}
