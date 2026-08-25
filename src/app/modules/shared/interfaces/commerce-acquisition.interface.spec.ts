import {commerceOriginCopy, commercePaymentLabel} from './commerce-acquisition.interface';

describe('commerce acquisition copy', () => {
  it('formats a ledger-backed or historical payment snapshot', () => {
    expect(commercePaymentLabel({origin: 'LEGACY_PAYMENT', totalPrice: '500', currencyCode: 'GEMS'}))
      .toBe('500 GEMS');
  });

  it('explains a grant anchor without displaying null fields', () => {
    expect(commercePaymentLabel({origin: 'LEGACY_GRANT', totalPrice: null, currencyCode: null}))
      .toBe('Выдано ранее');
    expect(commerceOriginCopy('LEGACY_GRANT').description).toContain('исходным периодом');
  });
});
