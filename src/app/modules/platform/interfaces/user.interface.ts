import {RolesEnum} from "../../shared/enums/roles.enum";

export interface UserResponseInterface {
  login: string
  userInvitedId: string
  email: string
  emailVerify: boolean
  role: RolesEnum
  subscription: string
  userId: string
  userInfoId: string
  userStatisticId: string
}
