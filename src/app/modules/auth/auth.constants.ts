import {PasswordPowerEnum} from "./enums/passwordPower.enum";

export const MIN_PASSWORD_LENGTH: number = 4;
export const MIN_LOGIN_LENGTH: number = 3;
export const MAX_LOGIN_LENGTH: number = 16;
export const LOGIN_VALIDATION_PATTERN = `^(?:[a-zA-Z\\d]+(?:(?:\\.|-|_)[a-zA-Z\\d])*)+$`
export const passwordPower = (password: string): PasswordPowerEnum => {
  return PasswordPowerEnum.BAD
}
