export interface SubscriptionText {
  text: string
  weight: 'medium' | 'regular'
}

export interface SubscriptionRes {
  decorationFirst: string
  decorationSecond: string
  decorationThird: string
  cost: number
  information: SubscriptionText[][]
  name: string
  color: string
}
