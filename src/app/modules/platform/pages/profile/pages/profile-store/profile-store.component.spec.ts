import {of} from 'rxjs';
import {ProfileStoreComponent} from './profile-store.component';

describe('ProfileStoreComponent', () => {
  it('groups global and game offers and uses currency presentation from the wallet contract', () => {
    const component = createComponent();
    component.ngOnInit();

    expect(component.groups.map(group => group.key)).toEqual(['global', 'hunt']);
    expect(component.offers[0].prices[0]).toMatchObject({displayName: 'Гемы', iconKey: 'gem', canAfford: true});
    expect(component.currencyOptions).toEqual([{code: 'GEMS', name: 'Гемы', icon: 'gem'}]);
  });

  it('filters the full catalog by player-facing scope, currency and search', () => {
    const component = createComponent();
    component.ngOnInit();
    component.setScope('hunt');
    component.setCurrency('GEMS');
    component.search = 'лучник';

    expect(component.resultCount).toBe(1);
    expect(component.groups[0].offers[0].name).toBe('Лучник');
  });
});

function createComponent(): ProfileStoreComponent {
  const offer = (gameCode: string | null, name: string) => ({
    code: `${gameCode ?? 'global'}.${name}`, productCode: `${gameCode ?? 'global'}.${name}`,
    productName: name, productDescription: 'Описание', productKind: 'PERMISSION' as const, gameCode,
    prices: [{currencyCode: 'GEMS', amount: '500'}], grants: [], eligibility: {eligible: true, reasons: []},
  });
  const commerce = {
    storefront: () => of({items: [offer(null, 'Префикс'), offer('hunt', 'Лучник')]}),
    wallets: () => of({items: [{currencyCode: 'GEMS', displayName: 'Гемы', iconKey: 'gem', exponent: 0, posted: '900', reserved: '0', available: '900'}]}),
  };
  const games = {list: () => of({items: [{code: 'hunt', name: 'Hunt', presentation: {description: 'Режим Hunt', icon: 'joystick', iconStroked: true, featuredStatCodes: []}}]})};
  return new ProfileStoreComponent(commerce as never, games as never);
}
