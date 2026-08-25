import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {StoreOfferView, StorePurchaseRequest} from '../../interfaces/store-offer.interface';

@Component({
  selector: 'yrx-store-offer-card',
  templateUrl: './store-offer-card.component.html',
  styleUrls: ['./store-offer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class StoreOfferCardComponent {
  @Input({required: true}) data!: StoreOfferView;
  @Input() loading = false;
  @Output() purchase = new EventEmitter<StorePurchaseRequest>();

  selectedPrice = 0;
  detailsVisible = false;
  confirmationVisible = false;

  selectPrice(index: number): void {
    this.selectedPrice = index;
    this.confirmationVisible = false;
  }

  beginPurchase(): void {
    const price = this.data.prices[this.selectedPrice];
    if (!price || !this.data.eligible || price.canAfford === false || this.loading) return;
    this.confirmationVisible = true;
  }

  confirmPurchase(): void {
    const price = this.data.prices[this.selectedPrice];
    if (!price || this.loading) return;
    this.purchase.emit({offerCode: this.data.offerCode, currencyCode: price.currencyCode});
    this.confirmationVisible = false;
  }
}
