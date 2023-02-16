import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MIN_PASSWORD_LENGTH} from "../../auth.constants";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'yrx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;

  ngOnInit() {
    this.dataFields()
    this.initForms()
    this.watchForms()
    this.login()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public login(): void {
    this.dataLoading = true;
    this.subscriptions.push(
      this.authService.login(this.form.getRawValue()).pipe(
        tap((response) => {
          console.log(response)
          this.dataLoading = false;
        }),
        catchError(err => {
          this.dataLoading = false
          throw new Error(err);
        })
      ).subscribe()
    )
  }

  private initForms(): void {
    this.form = this.fb.group({
      email: ["test@test.ru", [Validators.required, Validators.email]],
      password: ["12345", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]]
    })
  }

  private dataFields(): void {

  }

  private watchForms(): void {

  }

}
