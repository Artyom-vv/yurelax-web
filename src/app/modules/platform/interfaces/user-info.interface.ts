export interface UserInfoInterface {
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
  userInfoId: string
  createdAt: string
  updatedAt: string
}
