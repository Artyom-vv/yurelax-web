import {FormBuilder} from '@angular/forms';
import {of} from 'rxjs';
import {vi} from 'vitest';
import {AdminCommerceComponent} from './admin-commerce.component';

describe('AdminCommerceComponent', () => {
  const capability = {
    id: 'cap-1', providerCode: 'hunt', grantKey: 'class.archer', name: 'Класс Лучник',
    description: 'Открывает класс', gameCode: 'hunt', deliveryMode: 'ENTITLEMENT' as const,
    payloadSchema: {}, active: true, createdAt: '2026-08-25T00:00:00.000Z',
  };

  it('publishes ALL/ANY/NOT requirement trees from contract selections', () => {
    const {component, commerce} = fixture();
    component.offerForm.patchValue({
      code: 'hunt.archer.gems', productRevision: 'hunt.archer::1', requirementMode: 'ALL',
    });
    component.prices.at(0).patchValue({currencyCode: 'GEMS', amount: '250'});
    component.addRequirement();
    component.requirements.at(0).patchValue({
      kind: 'PROGRESSION_LEVEL', progressionCode: 'main', minimumLevel: 3,
    });
    component.addRequirement();
    component.requirements.at(1).patchValue({kind: 'GRANT_OWNED', capabilityId: 'cap-1', negated: true});

    component.publishOffer();

    expect(commerce.publishOffer).toHaveBeenCalledWith(expect.objectContaining({requirement: {
      kind: 'ALL', items: [
        {kind: 'PROGRESSION_LEVEL', progressionCode: 'main', minimumLevel: 3},
        {kind: 'NOT', item: {kind: 'GRANT_OWNED', providerCode: 'hunt', grantKey: 'class.archer',
          gameCode: 'hunt'}},
      ],
    }}));
  });

  it('publishes a calendar-bounded capability grant', () => {
    const {component, commerce} = fixture();
    component.productForm.patchValue({
      code: 'global.season-pass', name: 'Сезонный доступ', description: 'Доступ на сезон', version: 1,
    });
    component.grants.at(0).patchValue({
      capabilityId: 'cap-1', lifetimeKind: 'FIXED_WINDOW',
      startsAt: '2026-09-01T00:00', expiresAt: '2026-10-01T00:00', payload: '{}',
    });

    component.publishProduct();

    expect(commerce.publishProduct).toHaveBeenCalledWith(expect.objectContaining({grants: [
      expect.objectContaining({lifetime: {
        kind: 'FIXED_WINDOW', startsAt: new Date('2026-09-01T00:00').toISOString(),
        expiresAt: new Date('2026-10-01T00:00').toISOString(),
      }}),
    ]}));
  });

  function fixture() {
    const commerce = {
      publishProduct: vi.fn().mockReturnValue(of({productCode: 'global.season-pass', version: 1})),
      publishOffer: vi.fn().mockReturnValue(of({code: 'hunt.archer.gems', version: 1})),
    };
    const snackBar = {open: vi.fn()};
    const component = new AdminCommerceComponent(commerce as any, snackBar as any, new FormBuilder());
    component.references.capabilities = [capability];
    return {component, commerce};
  }
});
