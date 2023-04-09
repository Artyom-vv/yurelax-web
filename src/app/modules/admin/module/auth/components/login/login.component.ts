import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from "../../../../../auth/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {MIN_PASSWORD_LENGTH} from "../../../../../auth/auth.constants";
import {RolesEnum} from "../../../../../shared/enums/roles.enum";
import {AppStore} from "../../../../../../store/app.store";

@Component({
  selector: 'yrx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;
  public MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH

  ngOnInit() {
    this.initForms()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public login(): void {
    this.dataLoading = true;
    this.cdr.detectChanges()
    this.subscriptions.push(
      this.authService.adminLogin(this.form.getRawValue()).pipe(
        tap((res) => {
          if (res.user.role === RolesEnum.ADMIN) {
            this.authService.saveData(res);
            this.appStore.setIsLogged(true);
            this.router.navigate(['/admin']);
          } else {
            this._snackBar.open('Ваш аккаунт не имеет доступа', 'Закрыть')
          }
          this.dataLoading = false;
          this.cdr.detectChanges()
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

}
