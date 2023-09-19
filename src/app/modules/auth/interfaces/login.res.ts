import {UserRes} from "../../platform/interfaces/user.interface";
import {TokensResponseInterface} from "./tokens-response.interface";
import {UserInfo} from "../../platform/interfaces/user.info";

export interface LoginRes {
  tokens: TokensResponseInterface
  user: UserRes
}
