import { Component } from '@angular/core';
import {MailerService} from "../../../shared/services/mailer.service";
import {UserService} from "../../../platform/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize, Observable, Subscription, switchMap, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {CodeResponseInterface} from "../../../shared/interfaces/old/code-response.interface";
import {AuthStore} from "../../store/auth.store";

@Component({
  selector: 'yrx-recover-password-verify',
  templateUrl: './recover-password-verify.component.html',
  styleUrls: ['./recover-password-verify.component.scss']
})
export class RecoverPasswordVerifyComponent {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authStore: AuthStore,
    private route: ActivatedRoute
  ) {
  }

  private subscriptions: Subscription[] = []

  public operationId!: string;
  public dataLoading: boolean = false;

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParams.pipe(
        tap((value) => {
          this.operationId = value["operationId"];
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  onConfirm(code: number): void {
    this.dataLoading = true
    this.subscriptions.push(
      this.mailerService.verifyCode({operationId: this.operationId, code}).pipe(
        tap(() => {
          this.authStore.setIsRecoveringPasswordStep('recover');
          this.router.navigate(['/auth/recover-password'])
        }),
        finalize(() => this.dataLoading = false),
        catchError((err) => {
          this._snackBar.open(err.error.message, 'Закрыть')
          console.log(err)
          throw new Error(err)
        })
      ).subscribe()
    )
  }

  onResend() {
    this.dataLoading = true
    this.subscriptions.push(
      this.mailerService.deleteCode({
        operationId: this.operationId
      }).pipe(
        switchMap(() => this.createCode()),
        finalize(() => this.dataLoading = false),
        catchError(() => {
          return this.createCode()
        })
      ).subscribe()
    )
  }

  createCode(): Observable<CodeResponseInterface> {
    return this.authStore.recoveringPasswordEmail$.pipe(
      switchMap((email) => this.mailerService.recoverPasswordCode({email}).pipe(
        tap((response) => {
          this.operationId = response.operationId;
          this._snackBar.open('Код отправлен на вашу почту', 'Хорошо')
        })
      ))
    )
  }
}
