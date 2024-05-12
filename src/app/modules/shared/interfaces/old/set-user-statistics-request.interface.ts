export interface SetUserStatisticsRequestInterface {
  miniGameKey: string
  userId: string
  key: string
  value: number
  monthlyValue: number
  method: 'increment' | 'decrement' | 'reset'
}
