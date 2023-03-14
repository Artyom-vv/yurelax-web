import {UserResponseInterface} from "../../platform/interfaces/user.interface";
import {TokensResponseInterface} from "./tokens-response.interface";
import {UserInfoInterface} from "../../platform/interfaces/user-info.interface";

export interface RegisterResponseInterface {
  tokens: TokensResponseInterface
  user: UserResponseInterface
  userInfo: UserInfoInterface
}

