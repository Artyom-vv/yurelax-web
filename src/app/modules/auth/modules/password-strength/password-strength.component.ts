import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {PasswordStrengthEnum} from "../../enums/passwordStrengthEnum";
import {passwordStrength} from "../../auth.constants";

@Component({
  selector: 'yrx-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit, OnDestroy {
  @Input() control!: AbstractControl;

  private subscriptions: Subscription[] = []

  public passwordStrength: PasswordStrengthEnum = PasswordStrengthEnum.BAD;

  ngOnInit() {
    this.subscriptions.push(
      this.control.valueChanges.pipe(
        tap((password) => {
          this.passwordStrength = passwordStrength(password);
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
