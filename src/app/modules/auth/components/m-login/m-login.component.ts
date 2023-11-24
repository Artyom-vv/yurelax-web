import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {UserRes} from "../../../platform/interfaces/user.interface";
import {defer, filter, finalize, iif, mergeMap, of, Subscription, switchMap, take, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {SystemUserService} from "../../../shared/services/system-user.service";
import {AuthService} from "../../services/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthStore} from "../../store/auth.store";
import {ToolsService} from "../../../shared/services/tools.service";
import {PersistenceService} from "../../../shared/services/persistence.service";

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
    private persistenceService: PersistenceService
  ) {
  }

  private subscriptions: Subscription[] = []

  public greeting: boolean = true;
  public dataLoading: boolean = false;
  public userLoading: boolean = true;
  public successMA: boolean = false;
  public transitionToLogin: boolean = false;
  public error: boolean = false;
  public userStore: UserRes | null = null

  public MAKey: string = '';
  ngOnInit() {
    this.dataFields()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private dataFields(): void {

    let tempKey: string = ''

    const MaAuthPrepare$ = this.route.queryParams.pipe(
      filter(({key}) => {
        tempKey = key;
        return key
      }),
      filter(() => {
        const accessToken: string = this.systemUser.getAccessToken();
        const refreshToken: string = this.systemUser.getRefreshToken()

        const accessTokenExpired = this.toolsService.tokenExpired(accessToken);
        const refreshTokenExpired = this.toolsService.tokenExpired(refreshToken);

        // Проверка, что игрока не получится сразу авторизовать на сервере
        const authNotAvailable: boolean = accessToken ? accessTokenExpired : (refreshToken ? refreshTokenExpired : true)
        if (authNotAvailable) {
          setTimeout(() => {
            this.transitionToLogin = true;
          }, 600)
          setTimeout(() => {
            this.greeting = false;
            this.authStore.setMAKey(tempKey);
            this.router.navigate(['/auth/login'])
          }, 1800)
        }
        this.MAKey = tempKey
        return !authNotAvailable
      }),
      switchMap(() => MaAuth$)
    )

    const MaAuth$ = defer(() => {
      this.dataLoading = true
      return this.authService.minecraftAuth(this.MAKey).pipe(
        tap(status => {
          this.successMA = status
          this.dataLoading = false
        })
      )
    })

    this.subscriptions.push(
      this.appStore.user$.pipe(
        take(1),
        switchMap(user => {
          this.userStore = user
          this.userLoading = false;
          return this.authStore.MAKey$.pipe(
            take(1),
            mergeMap(key => {
              this.MAKey = key
              if (key) this.greeting = false
              return iif(() => !!key, MaAuth$, MaAuthPrepare$)
            }),
            finalize(() => this.authStore.setMAKey(''))
          )
        }),
        catchError((err) => {
          this.dataLoading = false
          this.error = true
          console.log(err)
          throw new Error(err.message)
        })
      ).subscribe()
    )
  }
}
