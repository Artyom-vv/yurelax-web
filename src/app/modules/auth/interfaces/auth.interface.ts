import {UserRes} from "../../platform/interfaces/user.interface";

export interface GetMeRes extends UserRes {

}

export interface LoginRes {
  tokens: TokensResponseInterface
  user: UserRes
}

export interface LoginReq {
  email: string;
  password: string
}

export interface RecoverPasswordReq {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface RecoverPasswordRes {

}

export interface RegisterRes {
  tokens: TokensResponseInterface
  user: UserRes
}

export interface RegisterReq {
  login: string;
  email: string;
  userInvitedId: string | null;
  password: string;
  passwordRepeat: string;
}

export interface TokensResponseInterface {
  accessToken: string
  refreshToken: string
}

