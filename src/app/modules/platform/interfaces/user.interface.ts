import {RolesEnum} from "../../shared/enums/roles.enum";
import {UserInfo} from "./user.info";

export interface UserRes {
  _id: string
  login: string
  userInvitedRef: string
  email: string
  emailVerify: boolean
  role: RolesEnum
  subscription: string
  userInfoRef: UserInfo
  userStatisticRef: string
}
