import {Component, OnDestroy, OnInit} from '@angular/core';
import {MailerService} from "../../../shared/services/mailer.service";
import {CodeResponseInterface} from "../../../shared/interfaces/code-response.interface";
import {finalize, Observable, Subscription, switchMap, tap} from "rxjs";
import {UserService} from "../../../platform/services/user.service";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'yrx-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss'],
})
export class EmailVerifyComponent implements OnInit, OnDestroy {

  constructor(
    private mailerService: MailerService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
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
        switchMap(() => this.userService.setEmailConfirmed()),
        tap(() => {
          this.router.navigate(['/platform/home'])
          this._snackBar.open('Аккаунт подтверждён', 'Хорошо')
        }),
        finalize(() => this.dataLoading = false),
        catchError((err) => {
          this._snackBar.open(err.message, 'Закрыть')
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
        finalize(() => {this.dataLoading = false}),
        catchError((err) => {
          if (err.status === 404) return this.createCode()
          throw new Error(err)
        })
      ).subscribe()
    )
  }

  createCode(): Observable<CodeResponseInterface> {
    return this.mailerService.createCode().pipe(
      tap((response) => {
        this.operationId = response.operationId;
        this._snackBar.open('Код отправлен на вашу почту', 'Хорошо')
      })
    )
  }
}
