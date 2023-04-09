import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthStore} from "../../store/auth.store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {finalize, Subscription, tap} from "rxjs";
import {MailerService} from "../../../shared/services/mailer.service";
import {ExistingUserValidator} from "../../../shared/validators/existing-user.validator";
import {UserService} from "../../../platform/services/user.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'yrx-which-email-recover',
  templateUrl: './which-email-recover.component.html',
  styleUrls: ['./which-email-recover.component.scss']
})
export class WhichEmailRecoverComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authStore: AuthStore,
    private _snackBar: MatSnackBar,
    private mailerService: MailerService,
    private userService: UserService
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup;
  public dataLoading: boolean = false;

  ngOnInit() {
    this.dataFields()
    this.initForms()
    this.watchForms()
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public send(): void {
    this.dataLoading = true;
    const {email} = this.form.getRawValue()
    this.authStore.setRecoveringPasswordEmail(email)
    this.subscriptions.push(
      this.mailerService.recoverPasswordCode({email}).pipe(
        tap(({operationId}) => {
          this.authStore.setIsRecoveringPasswordStep('verify');
          this._snackBar.open('Код отправлен на вашу почту', 'Хорошо')
          this.router.navigate(['/auth/recover-password-verify'], {queryParams: {operationId}})
        }),
        finalize(() => this.dataLoading = false),
        catchError((err) => {
          this._snackBar.open(err.error.message,"Закрыть")
          throw new Error(err)
        })
      ).subscribe()
    )
  }

  private initForms(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email], [ExistingUserValidator(this.userService, true)]],
    })
  }

  private dataFields(): void {

  }

  private watchForms(): void {

  }
}
