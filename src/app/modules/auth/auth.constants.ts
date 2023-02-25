import {PasswordStrengthEnum} from "./enums/passwordStrengthEnum";

export const MIN_PASSWORD_LENGTH: number = 4;
export const MIN_LOGIN_LENGTH: number = 3;
export const MAX_LOGIN_LENGTH: number = 16;
export const LOGIN_VALIDATION_PATTERN = `^(?:[a-zA-Z\\d]+(?:(?:\\.|-|_)[a-zA-Z\\d])*)+$`
const BAD_PASSWORDS: string[] = ['qwerty123', '1q2w3e', 'aa12345678', 'abc123', 'password1', 'password123', 'test1', 'Aa123456.', 'BvtTest123', 'ashley', 'q1w2e3r4t5y6','1q2w3e4r5t', 'abcd1234','1qaz2wsx3edc']
export const passwordStrength = (password: string): PasswordStrengthEnum => {
  const regexStart: string = '^.*'
  const regexEnd: string = '.*$'
  const regexLetters: string = '(?=.*[a-zA-Z])'
  const regexDigits: string = '(?=.*\\d)'
  const regexSpecialCharacters: string = '(?=.*[*+@#$%^&?()[{\\|])'

  const regexForBadPassword = new RegExp(regexStart + regexLetters + regexEnd);
  const regexForNormalPassword = new RegExp(regexStart + regexLetters + regexDigits + regexEnd);
  const regexForGoodPassword = new RegExp(regexStart + regexLetters + regexDigits + regexSpecialCharacters + regexEnd);

  if (BAD_PASSWORDS.includes(password)) {
    return PasswordStrengthEnum.BAD
  } else if (regexForGoodPassword.test(password)) {
    return PasswordStrengthEnum.GOOD
  } else if (regexForNormalPassword.test(password)) {
    return PasswordStrengthEnum.NORMAL
  } else if (regexForBadPassword.test(password)) {
    return PasswordStrengthEnum.BAD
  }
  return PasswordStrengthEnum.BAD
}
