import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {filter, Subscription, switchMap, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MIN_PASSWORD_LENGTH, PASSWORD_VALIDATION_PATTERN} from "../../auth.constants";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthStore} from "../../store/auth.store";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'yrx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('false => true', [
        style({
          opacity: 1
        }),
        animate('600ms ease', style({
          opacity: 0
        })),
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authStore: AuthStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;
  public isWaitingForMA: boolean = false;
  public transitionToMA: boolean = false;

  ngOnInit() {
    this.dataFields()
    this.initForms()
    this.watchForms()
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public login(): void {
    this.dataLoading = true;
    this.cdr.detectChanges()
    this.subscriptions.push(
      this.authService.login(this.form.getRawValue()).pipe(
        tap(() => {
          this.dataLoading = false;
          this.cdr.detectChanges()
          if (!this.isWaitingForMA) this.router.navigate(['/platform']);
        }),
        filter(() => this.isWaitingForMA),
        switchMap((res) => this.authService.jwtMaAuth(res.user.login)),
        tap((res) => {
          this.transitionToMA = true;
          this.cdr.detectChanges()
          setTimeout(() => {
            this.router.navigate(['/auth/minecraft'], {
              queryParams: {
                authStatus: res.success
              }
            });
          }, 600)
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
    this.subscriptions.push(
      this.authStore.isWaitingForMA$.pipe(
        tap((val) => {
          this.isWaitingForMA = val
        })
      ).subscribe()
    )
  }

  private watchForms(): void {

  }

}
