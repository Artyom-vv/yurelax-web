export type FootPanelType = 'back' | 'forward'

export interface FootPanelItem<T = any> {
  type: FootPanelType
  data: T
}
