import {SubscriptionComponent} from './subscription.component';
import {SubscriptionRes} from '../../interfaces/subscription.interface';

describe('SubscriptionComponent', () => {
  it('requires an explicit second click before emitting a purchase', () => {
    const component = createComponent();
    const purchases: unknown[] = [];
    component.purchase.subscribe(value => purchases.push(value));

    component.buy();
    expect(component.confirmationVisible).toBe(true);
    expect(purchases).toEqual([]);

    component.buy();
    expect(purchases).toEqual([{offerCode: 'hunt.class.archer', currencyCode: 'GEMS'}]);
    expect(component.confirmationVisible).toBe(false);
  });

  it('does not confirm a price the player cannot afford', () => {
    const component = createComponent(false);
    const purchases: unknown[] = [];
    component.purchase.subscribe(value => purchases.push(value));

    component.buy();

    expect(component.confirmationVisible).toBe(false);
    expect(purchases).toEqual([]);
  });

  it('cancels confirmation when the player changes currency', () => {
    const component = createComponent();
    component.confirmationVisible = true;

    component.selectPrice(0);

    expect(component.confirmationVisible).toBe(false);
  });
});

function createComponent(canAfford = true): SubscriptionComponent {
  const component = new SubscriptionComponent();
  component.data = {
    name: 'Лучник', offerCode: 'hunt.class.archer', productCode: 'hunt.class.archer', gameCode: 'hunt',
    prices: [{currencyCode: 'GEMS', amount: '500', available: '750', canAfford}],
    information: [], details: [], eligible: true, eligibilityText: '', color: '#fff',
    decorationFirst: '', decorationSecond: '', decorationThird: '',
  } satisfies SubscriptionRes;
  return component;
}
