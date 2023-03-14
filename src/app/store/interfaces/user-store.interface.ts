import {UserResponseInterface} from "../../modules/platform/interfaces/user.interface";
import {UserInfoInterface} from "../../modules/platform/interfaces/user-info.interface";

export interface UserStoreInterface {
  user: UserResponseInterface | null
  userInfo: UserInfoInterface | null
}
