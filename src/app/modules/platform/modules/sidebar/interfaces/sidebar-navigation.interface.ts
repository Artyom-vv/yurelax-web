export interface SidebarNavigationInterface {
  name: string
  link?: string
  icon: string
  iconStroked: boolean
  isButton: boolean
  callback?: () => void
}
