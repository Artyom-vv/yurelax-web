import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {SubscriptionPurchaseRequest, SubscriptionRes} from "../../interfaces/subscription.interface";

@Component({
    selector: 'yrx-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SubscriptionComponent {
  @Input() data!: SubscriptionRes
  @Input() loading = false;
  @Output() purchase = new EventEmitter<SubscriptionPurchaseRequest>();
  public selectedPrice = 0;
  public detailsVisible = false;

  selectPrice(index: number): void {
    this.selectedPrice = index;
  }

  buy(): void {
    const price = this.data.prices[this.selectedPrice];
    if (!price || !this.data.eligible || this.loading) return;
    this.purchase.emit({offerCode: this.data.offerCode, currencyCode: price.currencyCode});
  }

  getClasses(item: any): {[key: string]: boolean} {
    return {
      [item.weight]: true,
      'c-gradation-100': item.weight === 'medium',
      'c-gradation-300': item.weight !== 'medium'
    };
  }

}
