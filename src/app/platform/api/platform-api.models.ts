export interface WebSessionState {
  authenticated: boolean;
  csrfToken?: string;
}

export interface PlayerIdentity {
  playerId: string;
  identityId: string;
  provider: 'KEYCLOAK' | 'MINECRAFT' | 'DISCORD';
  externalId: string;
  verifiedAt: string;
}

export interface PlayerProfile {
  playerId: string;
  currentName: string;
  identities: PlayerIdentity[];
}

export interface CursorPage {
  nextCursor: string | null;
  hasMore: boolean;
}

export interface EligibilityReason {
  code: string;
  requirement: unknown;
  actual: string | null;
}

export interface CommerceOffer {
  code: string;
  productCode: string;
  productName: string;
  productDescription: string;
  productKind: 'PERMISSION' | 'ITEM' | 'REWARD_ACCESS' | 'CUSTOM';
  deliveryMode: 'ENTITLEMENT' | 'FULFILLMENT';
  purchasePolicy: 'REPEATABLE' | 'SINGLE_ACTIVE';
  providerCode: string;
  fulfillmentKey: string;
  payload?: unknown;
  grants: unknown[];
  requirement: unknown | null;
  gameCode: string | null;
  active: boolean;
  prices: CommercePrice[];
  eligibility: { eligible: boolean; reasons: EligibilityReason[] } | null;
  effectiveFrom: string;
  effectiveUntil: string | null;
}

export interface CommercePrice {
  currencyCode: string;
  amount: string;
}

export interface CommercePurchase {
  id: string;
  playerId: string;
  offerCode: string;
  productCode: string;
  quantity: number;
  currencyCode: string;
  unitPrice: string;
  totalPrice: string;
  ledgerTransactionId: string;
  purchasedAt: string;
  status: 'CONFIRMED';
}

export interface ActivationState {
  canActivate: boolean;
  blockedReason: string | null;
  activeActivation: unknown | null;
  lifetimeUsed: number;
  lifetimeRemaining: number | null;
  periodUsed: number;
  periodRemaining: number | null;
  periodResetsAt: string | null;
}

export interface CommerceEntitlement {
  id: string;
  purchaseId: string;
  playerId: string;
  productCode: string;
  grantOrdinal: number;
  kind: CommerceOffer['productKind'];
  purchasePolicy: CommerceOffer['purchasePolicy'];
  ownershipPolicy: 'DENY_DUPLICATE' | 'EXTEND' | 'REPLACE' | 'STACK';
  providerCode: string;
  entitlementKey: string;
  gameCode: string | null;
  activationPolicy: unknown | null;
  payload?: unknown;
  status: 'ACTIVE' | 'CONSUMED' | 'REVOKED';
  grantedAt: string;
  startsAt: string;
  expiresAt: string | null;
  consumedAt: string | null;
  revokedAt: string | null;
  activationState: ActivationState;
}

export interface ItemPage<T> {
  items: T[];
  page?: CursorPage;
}

export interface CabinetData {
  profile: PlayerProfile;
  offers: ItemPage<CommerceOffer>;
  purchases: ItemPage<CommercePurchase>;
  entitlements: ItemPage<CommerceEntitlement>;
}
