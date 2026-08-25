import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OpacityAnimation} from "../../animations/opacity.animation";
import {AppStore} from '../../../../store/app.store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {MIN_PASSWORD_LENGTH} from '../../auth.constants';

@Component({
    selector: 'yrx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        OpacityAnimation
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly appStore: AppStore,
    private readonly auth: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly changeDetector: ChangeDetectorRef,
  ) {
  }

  public readonly platformAvailable$ = this.appStore.platformAvailable$;
  public readonly MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH;
  public form!: FormGroup;

  public dataLoading: boolean = false;
  public transitionToMA: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      identifier: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(254)]],
      password: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(256)]],
    });
  }

  public login(): void {
    if (this.form.invalid || this.dataLoading) return;
    this.dataLoading = true;
    const returnTo = this.safeReturnTo(this.route.snapshot.queryParamMap.get('returnTo'));
    const request: Observable<unknown> = returnTo.startsWith('/auth/link')
      ? this.auth.loginSession(this.form.getRawValue())
      : this.auth.login(this.form.getRawValue());
    request.pipe(
      finalize(() => {
        this.dataLoading = false;
        this.changeDetector.markForCheck();
      }),
      catchError(error => {
        const message = error.status === 401
          ? 'Неверный логин или пароль'
          : 'Yurelax ID сейчас недоступен. Попробуйте ещё раз.';
        this.snackBar.open(message, 'Закрыть');
        return throwError(() => error);
      })
    ).subscribe({next: () => this.router.navigateByUrl(returnTo), error: () => undefined});
  }

  private safeReturnTo(value: string | null): string {
    return value?.startsWith('/') && !value.startsWith('//') ? value : '/platform/profile/home';
  }
}
