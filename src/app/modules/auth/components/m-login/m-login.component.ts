import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {UserResponseInterface} from "../../../platform/interfaces/user.interface";
import {filter, Subscription, switchMap, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {SystemUserService} from "../../../shared/services/global/system-user.service";
import {AuthService} from "../../services/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {JwtMaAuthResponseInterface} from "../../interfaces/jwt-ma-auth-response.interface";
import {AuthStore} from "../../store/auth.store";
import {ToolsService} from "../../../shared/services/global/tools.service";

@Component({
  selector: 'yrx-m-login',
  templateUrl: './m-login.component.html',
  styleUrls: ['./m-login.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('false', style({
        opacity: 1,
        display: 'block',
        position: 'absolute',
        width: '100%',
        top: '50%',
        left: '50%',
        transform: 'translateY(-50%) translateX(-50%)'
      })),
      state('true', style({
        opacity: 0,
        display: 'none',
        position: 'absolute',
        width: '100%',
        top: '50%',
        left: '50%',
        transform: 'translateY(-50%) translateX(-50%)'
      })),
      transition('false => true', [
        animate('600ms 600ms ease'),
      ]),
      transition('true => false', [
        style({
          display: 'block',
        }),
        animate('600ms 1200ms ease'),
      ])
    ])
  ]
})
export class MLoginComponent implements OnInit, OnDestroy {
  constructor(
    private appStore: AppStore,
    private router: Router,
    private route: ActivatedRoute,
    private systemUser: SystemUserService,
    private authService: AuthService,
    private authStore: AuthStore,
    private toolsService: ToolsService,
  ) {
  }

  private subscriptions: Subscription[] = []

  public dataLoading: boolean = true;
  public userLoading: boolean = true;
  public successMA: boolean = false;
  public transitionToLogin: boolean = false;
  public isWaitingForMA: boolean = false;
  public error: boolean = false;
  public user: UserResponseInterface | null = null

  ngOnInit() {
    this.dataFields()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.successMA) this.authStore.setIsWaitingForMA(false)
  }

  private dataFields(): void {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        switchMap(user => {
          this.user = user
          this.userLoading = false;
          return this.authStore.isWaitingForMA$
        }),
        switchMap((isWaitingForMA) => {
          this.isWaitingForMA = isWaitingForMA;
          return this.route.queryParams.pipe(
            tap(({authStatus}) => {
              this.successMA = authStatus && this.isWaitingForMA;
            })
          )
        }),
        filter(() => !this.isWaitingForMA),
        switchMap(() => this.route.queryParams.pipe(
          filter(({authToken}) => {
            if (!authToken) return this.router.navigate(['/platform'])
            return authToken
          }),
          switchMap(({authToken}) => this.authService.jwtMa(authToken)),
          filter(() => {
            const accessToken: string = this.systemUser.getAccessToken();
            const refreshToken: string = this.systemUser.getRefreshToken()

            const accessTokenExpired = this.toolsService.tokenExpired(accessToken);
            const refreshTokenExpired = this.toolsService.tokenExpired(refreshToken);

            const authNotAvailable: boolean = accessToken ? accessTokenExpired : refreshToken ? refreshTokenExpired : true
            console.log(authNotAvailable)
            if (authNotAvailable) {
              setTimeout(() => {
                this.transitionToLogin = true;
              }, 600)
              setTimeout(() => {
                this.authStore.setIsWaitingForMA(true);
                this.router.navigate(['/auth/login'])
              }, 1800)
            }
            return !authNotAvailable
          }),
          switchMap((res) => this.authService.jwtMaAuth(res.login)),
          tap((res: JwtMaAuthResponseInterface) => {
            this.successMA = res.success
            this.dataLoading = false
          }),
          catchError((err) => {
            this.dataLoading = false
            this.error = true
            throw new Error(err)
          })
        ))
      ).subscribe()
    )
  }
}
