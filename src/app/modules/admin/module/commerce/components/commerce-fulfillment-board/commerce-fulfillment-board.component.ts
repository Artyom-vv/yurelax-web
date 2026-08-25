import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {
  CommerceFulfillmentHealthState,
  CommerceFulfillmentInspection,
  CommerceFulfillmentInspectionResult,
  CommerceFulfillmentStatus,
} from '../../../../../shared/services/admin-commerce.service';

@Component({
  selector: 'yrx-commerce-fulfillment-board',
  templateUrl: './commerce-fulfillment-board.component.html',
  styleUrls: ['./commerce-fulfillment-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CommerceFulfillmentBoardComponent {
  @Input({required: true}) data!: CommerceFulfillmentInspectionResult;

  public healthLabel(state: CommerceFulfillmentHealthState): string {
    return ({HEALTHY: 'Выдача работает', DEGRADED: 'Нужна проверка', STALLED: 'Выдача остановилась'})[state];
  }

  public healthDescription(state: CommerceFulfillmentHealthState): string {
    return ({
      HEALTHY: 'Задачи забираются обработчиком без признаков задержки.',
      DEGRADED: 'Есть повторные попытки или просроченные задачи. Проверьте обработчик.',
      STALLED: 'Купленные товары остаются без физической выдачи дольше допустимого времени.',
    })[state];
  }

  public statusLabel(status: CommerceFulfillmentStatus): string {
    return ({PENDING: 'Ожидает', CLAIMED: 'В работе', FULFILLED: 'Выдано', FAILED: 'Ошибка'})[status];
  }

  public age(seconds: number | null): string {
    if (seconds === null) return '—';
    if (seconds < 60) return `${seconds} сек.`;
    if (seconds < 3_600) return `${Math.floor(seconds / 60)} мин.`;
    if (seconds < 86_400) return `${Math.floor(seconds / 3_600)} ч.`;
    return `${Math.floor(seconds / 86_400)} дн.`;
  }

  public taskTitle(task: CommerceFulfillmentInspection): string {
    return `${task.productCode} · ${task.fulfillmentKey}`;
  }
}
