import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {TransitionPanelType} from "./interfaces/transition-panel.interface";
import {PlayerWalletTransaction} from '../../../profile-store/interfaces/commerce.interface';

@Component({
    selector: 'yrx-transaction-panel',
    templateUrl: './transaction-panel.component.html',
    styleUrls: ['./transaction-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TransactionPanelComponent {
  private readonly reasonNames: Record<string, string> = {
    TOP_UP: 'Пополнение баланса',
    SHOP_PURCHASE: 'Покупка в магазине',
    PLAYER_TRANSFER: 'Перевод игроку',
    HUNT_KILL: 'Награда за убийство',
    HUNT_VICTORY: 'Награда за победу',
    STAT_REWARD: 'Игровая награда',
    REWARD_GRANT: 'Получена награда',
    BURN: 'Списание валюты',
  };
  @Input() even: boolean = false;
  @Input({required: true}) transaction!: PlayerWalletTransaction;

  public get type(): TransitionPanelType {
    return this.transaction.amount.startsWith('-') ? 'outcome' : 'income';
  }

  public get amount(): string {
    const value = this.transaction.amount;
    return value.startsWith('-') ? value.slice(1) : value;
  }

  public reason(code: string): string {
    return this.reasonNames[code] ?? 'Операция с балансом';
  }
}
