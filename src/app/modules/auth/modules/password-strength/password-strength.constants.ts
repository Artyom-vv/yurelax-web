import {PasswordStrengthEnum} from "../../enums/passwordStrengthEnum";
import {PasswordStrengthItemInterface} from "./interfaces/password-strength-item.interface";

export const PASSWORD_STRENGTH_CONSTANTS: {[key: number]: PasswordStrengthItemInterface} = {
  [PasswordStrengthEnum.BAD]: {
    textColorClass: 'c-red-100',
    backgroundColorClass: 'status-bad',
    text: 'Слабый пароль'
  },
  [PasswordStrengthEnum.NORMAL]: {
    textColorClass: 'c-yellow-100',
    backgroundColorClass: 'status-normal',
    text: 'Нормальный пароль'
  },
  [PasswordStrengthEnum.GOOD]: {
    textColorClass: 'c-green-100',
    backgroundColorClass: 'status-good',
    text: 'Сильный пароль'
  }
}
