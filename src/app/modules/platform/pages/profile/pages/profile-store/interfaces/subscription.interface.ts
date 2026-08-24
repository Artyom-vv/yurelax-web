export interface SubscriptionText {
  text: string
  weight: 'medium' | 'regular'
}

export interface SubscriptionRes {
  decorationFirst: string
  decorationSecond: string
  decorationThird: string
  prices: {currencyCode: string; amount: string}[]
  information: SubscriptionText[][]
  name: string
  color: string
  offerCode: string
  productCode: string
  gameCode: string | null
  eligible: boolean
  eligibilityText: string
  details: string[]
}

export interface SubscriptionPurchaseRequest {
  offerCode: string;
  currencyCode: string;
}
