export interface MiniGameRequestInterface {
  image: File
  miniGameKey: string
  name: string
  description: string
  icon: string
  iconStroked: boolean
  filteredByKey: string
  keys: string[]
}
