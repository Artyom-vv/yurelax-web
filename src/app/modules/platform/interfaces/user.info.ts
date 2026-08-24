export interface UserInfo {
  level: number
  pouches: number
  coins: number
  ucoins: number
  prestigeScore: number
  lastOnlineDate: number
  isOnline: boolean
  skinType: 'default' | 'slim'
  skinUrl: string | null
  avatarUrl: string | null
  minecraftLinked?: boolean
  userInfoId: string
  createdAt: string
  updatedAt: string
}
