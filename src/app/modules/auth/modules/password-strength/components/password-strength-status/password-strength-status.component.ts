import {Component, Input} from '@angular/core';
import {PasswordStrengthEnum} from "../../../../enums/passwordStrengthEnum";
import {PASSWORD_STRENGTH_CONSTANTS} from "../../password-strength.constants";

@Component({
  selector: 'yrx-password-strength-status',
  templateUrl: './password-strength-status.component.html',
  styleUrls: ['./password-strength-status.component.scss'],
  standalone: false,
})
export class PasswordStrengthStatusComponent {
  @Input() status: PasswordStrengthEnum = PasswordStrengthEnum.BAD;
  PASSWORD_STRENGTH_CONSTANTS = PASSWORD_STRENGTH_CONSTANTS;
}
