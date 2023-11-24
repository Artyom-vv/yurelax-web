import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {filter, Subscription, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MIN_PASSWORD_LENGTH} from "../../auth.constants";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthStore} from "../../store/auth.store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OpacityAnimation} from "../../animations/opacity.animation";

@Component({
  selector: 'yrx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    OpacityAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authStore: AuthStore,
    private _snackBar: MatSnackBar
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;
  public MAKey: string = '';
  public transitionToMA: boolean = false;
  public MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH

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
          if (!this.MAKey) this.router.navigate(['/platform']);
        }),
        filter(() => !!this.MAKey),
        tap(() => {
          this.transitionToMA = true;
          this.cdr.detectChanges()
          setTimeout(() => this.router.navigate(['/auth/minecraft'], {
            queryParams: {
              key: this.MAKey
            }
          }), 600)
        }),
        catchError(err => {
          this.dataLoading = false
          this.cdr.detectChanges()
          if (err.status === 401) {
            this._snackBar.open('Неправильный логин или пароль', 'Закрыть')
          } else {
            this._snackBar.open(err.error.message, 'Закрыть')
          }

          throw new Error(err.message);
        })
      ).subscribe()
    )
  }

  private initForms(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]]
    })
  }

  private dataFields(): void {
    this.subscriptions.push(
      this.authStore.MAKey$.pipe(
        tap(key => {
          this.MAKey = key
        })
      ).subscribe()
    )
  }

  private watchForms(): void {

  }

}
