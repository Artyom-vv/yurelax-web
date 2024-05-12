import {Component, Input, OnInit} from '@angular/core';
import {FormGroupDirective, NgControl} from "@angular/forms";
import {tap} from "rxjs";
import {PasswordStrengthEnum} from "../../enums/passwordStrengthEnum";
import {passwordStrength} from "../../auth.constants";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'yrx-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit {

  @Input() control: string = 'password'

  public passwordStrength: PasswordStrengthEnum = PasswordStrengthEnum.BAD;

  constructor(
    private formGroupDirective: FormGroupDirective
  ) {
  }

  ngOnInit() {
    this.formGroupDirective.control.get(this.control)?.valueChanges.pipe(
      tap((password) => {
        this.passwordStrength = passwordStrength(password);
      }),
      untilDestroyed(this)
    ).subscribe()
  }
}
