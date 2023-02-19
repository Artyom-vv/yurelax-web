import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MIN_PASSWORD_LENGTH, PASSWORD_VALIDATION_PATTERN} from "../../auth.constants";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'yrx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;

  ngOnInit() {
    this.dataFields()
    this.initForms()
    this.watchForms()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public login(): void {
    this.dataLoading = true;
    this.subscriptions.push(
      this.authService.login(this.form.getRawValue()).pipe(
        tap((response) => {
          this.dataLoading = false;
          this.router.navigate(['/platform']);
        }),
        catchError(err => {
          this.dataLoading = false
          this.cdr.detectChanges()
          throw new Error(err);
        })
      ).subscribe()
    )
  }

  private initForms(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.pattern(PASSWORD_VALIDATION_PATTERN)]]
    })
  }

  private dataFields(): void {

  }

  private watchForms(): void {

  }

}
