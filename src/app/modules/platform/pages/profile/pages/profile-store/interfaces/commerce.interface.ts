export type CommerceProductKind = 'PERMISSION' | 'ITEM' | 'REWARD_ACCESS' | 'CUSTOM';

export interface CommercePrice {
  currencyCode: string;
  amount: string;
}

export interface CommerceRequirement {
  kind: string;
  [key: string]: unknown;
}

export interface CommerceEligibilityReason {
  code: string;
  requirement: CommerceRequirement;
  actual: string | null;
}

export interface CommerceGrant {
  ordinal: number;
  providerCode: string;
  grantKey: string;
  gameCode: string | null;
  deliveryMode: 'ENTITLEMENT' | 'FULFILLMENT';
  capabilityName: string;
  capabilityDescription: string;
  payload: unknown;
}

export interface CommerceOffer {
  code: string;
  productCode: string;
  productName: string;
  productDescription: string;
  productKind: CommerceProductKind;
  gameCode: string | null;
  prices: CommercePrice[];
  grants: CommerceGrant[];
  eligibility: {
    eligible: boolean;
    reasons: CommerceEligibilityReason[];
  } | null;
}

export interface CommerceStorefront {
  items: CommerceOffer[];
}

export interface PlayerWalletBalance {
  currencyCode: string;
  exponent: number;
  posted: string;
  reserved: string;
  available: string;
}

export interface PlayerWalletPage {
  items: PlayerWalletBalance[];
}

export interface CommercePurchaseResult {
  purchase: {
    id: string;
    offerCode: string;
    productCode: string;
    productName: string;
    quantity: number;
    currencyCode: string;
    totalPrice: string;
    purchasedAt: string;
    status: 'CONFIRMED';
  };
  entitlements: unknown[];
  replayed: boolean;
}

export interface CommercePurchase {
  id: string;
  offerCode: string;
  productCode: string;
  productName: string;
  quantity: number;
  currencyCode: string;
  unitPrice: string;
  totalPrice: string;
  purchasedAt: string;
  status: 'CONFIRMED';
}

export interface CommerceActivationState {
  canActivate: boolean;
  blockedReason: string | null;
  activeActivation: {startsAt: string; expiresAt: string} | null;
  lifetimeUsed: number;
  lifetimeRemaining: number | null;
  periodUsed: number;
  periodRemaining: number | null;
  periodResetsAt: string | null;
}

export interface CommerceEntitlement {
  id: string;
  productCode: string;
  productName: string;
  kind: CommerceProductKind;
  providerCode: string;
  entitlementKey: string;
  capabilityName: string;
  capabilityDescription: string;
  gameCode: string | null;
  status: 'ACTIVE' | 'CONSUMED' | 'REVOKED';
  grantedAt: string;
  startsAt: string;
  expiresAt: string | null;
  activationState: CommerceActivationState;
}

export interface CursorPage<T> {
  items: T[];
  page: {nextCursor: string | null; hasMore: boolean};
}
