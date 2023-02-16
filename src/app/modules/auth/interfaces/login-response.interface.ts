import {UserResponseInterface} from "../../platform/interfaces/user.interface";
import {TokensResponseInterface} from "./tokens-response.interface";

export interface LoginResponseInterface {
  tokens: TokensResponseInterface
  user: UserResponseInterface
}
