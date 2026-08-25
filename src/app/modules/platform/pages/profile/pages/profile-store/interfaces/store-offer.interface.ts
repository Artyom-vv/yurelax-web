export interface StorePriceView {
  currencyCode: string;
  displayName: string;
  iconKey: string;
  amount: string;
  available: string | null;
  canAfford: boolean | null;
}

export interface StoreOfferView {
  name: string;
  description: string;
  offerCode: string;
  productCode: string;
  productKind: string;
  gameCode: string | null;
  scopeName: string;
  scopeDescription: string;
  scopeIcon: string;
  prices: StorePriceView[];
  eligible: boolean;
  eligibilityText: string;
  details: string[];
  fulfillmentRequired: boolean;
}

export interface StoreOfferGroup {
  key: string;
  name: string;
  description: string;
  icon: string;
  offers: StoreOfferView[];
}

export interface StorePurchaseRequest {
  offerCode: string;
  currencyCode: string;
}
