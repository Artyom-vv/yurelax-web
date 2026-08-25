import {StoreOfferCardComponent} from './store-offer-card.component';
import {StoreOfferView} from '../../interfaces/store-offer.interface';

describe('StoreOfferCardComponent', () => {
  it('requires explicit confirmation before emitting a purchase', () => {
    const component = createComponent();
    const purchases: unknown[] = [];
    component.purchase.subscribe(value => purchases.push(value));

    component.beginPurchase();
    expect(component.confirmationVisible).toBe(true);
    expect(purchases).toEqual([]);

    component.confirmPurchase();
    expect(purchases).toEqual([{offerCode: 'hunt.class.archer', currencyCode: 'GEMS'}]);
    expect(component.confirmationVisible).toBe(false);
  });

  it('does not open confirmation when the player cannot afford the selected price', () => {
    const component = createComponent(false);
    component.beginPurchase();
    expect(component.confirmationVisible).toBe(false);
  });

  it('cancels confirmation when the player changes currency', () => {
    const component = createComponent();
    component.confirmationVisible = true;
    component.selectPrice(0);
    expect(component.confirmationVisible).toBe(false);
  });
});

function createComponent(canAfford = true): StoreOfferCardComponent {
  const component = new StoreOfferCardComponent();
  component.data = {
    name: 'Лучник', description: 'Игровой класс', offerCode: 'hunt.class.archer', productCode: 'hunt.class.archer',
    productKind: 'Право', gameCode: 'hunt', scopeName: 'Hunt', scopeDescription: 'Режим Hunt', scopeIcon: 'joystick',
    prices: [{currencyCode: 'GEMS', displayName: 'Гемы', iconKey: 'gem', amount: '500', available: '750', canAfford}],
    details: [], eligible: true, eligibilityText: '', fulfillmentRequired: false,
  } satisfies StoreOfferView;
  return component;
}
