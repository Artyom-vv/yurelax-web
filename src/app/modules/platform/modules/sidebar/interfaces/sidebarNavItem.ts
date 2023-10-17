export interface SidebarNavItem<T = any> {
  name: string
  link?: string
  icon: string
  iconStroked: boolean
  isButton: boolean
  callback?: () => void
  data?: T
}

export type SidebarNavigation<T = any> = SidebarNavItem<T>[][]
