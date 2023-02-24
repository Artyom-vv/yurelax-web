import {PasswordStrengthEnum} from "./enums/passwordStrengthEnum";

export const MIN_PASSWORD_LENGTH: number = 4;
export const MIN_LOGIN_LENGTH: number = 3;
export const MAX_LOGIN_LENGTH: number = 16;
export const LOGIN_VALIDATION_PATTERN = `^(?:[a-zA-Z\\d]+(?:(?:\\.|-|_)[a-zA-Z\\d])*)+$`
export const passwordStrength = (password: string): PasswordStrengthEnum => {
  const regexStart: string = '^.*'
  const regexEnd: string = '.*$'
  const regexLetters: string = '(?=.*[a-zA-Z])'
  const regexDigits: string = '(?=.*\\d)'
  const regexSpecialCharacters: string = '(?=.*[!#@$%&? "])'

  const regexForBadPassword = new RegExp(regexStart+regexLetters+regexEnd);
  const regexForNormalPassword = new RegExp(regexStart+regexLetters+regexDigits+regexEnd);
  const regexForGoodPassword = new RegExp(regexStart+regexLetters+regexDigits+regexSpecialCharacters+regexEnd);

  if (regexForGoodPassword.test(password)) {
    return PasswordStrengthEnum.GOOD
  } else if (regexForNormalPassword.test(password)) {
    return PasswordStrengthEnum.NORMAL
  } else if (regexForBadPassword.test(password)) {
    return PasswordStrengthEnum.BAD
  }
  return PasswordStrengthEnum.BAD
}
