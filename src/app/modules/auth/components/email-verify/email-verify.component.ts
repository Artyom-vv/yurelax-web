import {Component, OnDestroy, OnInit} from '@angular/core';
import {MailerService} from "../../../shared/services/mailer.service";
import {CodeResponseInterface} from "../../../shared/interfaces/old/code-response.interface";
import {filter, finalize, Observable, Subscription, switchMap, tap} from "rxjs";
import {UserService} from "../../../platform/services/user.service";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {OpacityAnimation} from "../../animations/opacity.animation";
import {AuthStore} from "../../store/auth.store";

@Component({
  selector: 'yrx-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss'],
  animations: [
    OpacityAnimation
  ],
})
export class EmailVerifyComponent implements OnInit, OnDestroy {

  constructor(
    private mailerService: MailerService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private authStore: AuthStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public MAKey: string = '';
  public transitionToMA: boolean = false;

  public operationId!: string;
  public dataLoading: boolean = false;

  ngOnInit() {
    this.dataFields()
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
          if (!this.MAKey) this.router.navigate(['/platform/home'])
          this._snackBar.open('Аккаунт подтверждён', 'Хорошо')
        }),
        filter(() => !!this.MAKey),
        tap(() => {
          this.transitionToMA = true;
          setTimeout(() => this.router.navigate(['/auth/minecraft'], {
            queryParams: {
              key: this.MAKey
            }
          }), 600)
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
    return this.mailerService.confirmEmailCode().pipe(
      tap((response) => {
        this.operationId = response.operationId;
        this._snackBar.open('Код отправлен на вашу почту', 'Хорошо')
      })
    )
  }

  private dataFields() {
    this.subscriptions.push(
      this.route.queryParams.pipe(
        tap((value) => {
          this.operationId = value["operationId"];
        })
      ).subscribe()
    )
    this.subscriptions.push(
      this.authStore.MAKey$.pipe(
        tap(key => {
          this.MAKey = key
        })
      ).subscribe()
    )
  }
}
