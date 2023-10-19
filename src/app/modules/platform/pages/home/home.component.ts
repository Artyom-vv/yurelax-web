import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {filter, finalize, Subscription, switchMap, tap} from "rxjs";
import {SystemUserService} from "../../../shared/services/system-user.service";
import {ContentLayoutInterface} from "./components/content-layout/interfaces/content-layout.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MiniGamesService} from "../../../shared/services/mini-games.service";
import {MiniGameResponseInterface} from "../../../shared/interfaces/mini-game-response.interface";

@Component({
  selector: 'yrx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore,
    private systemUserService: SystemUserService,
    private fb: FormBuilder,
    private miniGamesService: MiniGamesService
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup

  public isLogged: boolean = false;
  public preloading: boolean = true;
  public dataLoading: boolean = true;
  public messageLoading: boolean = false;
  public access_token: boolean = false;
  public miniGames: MiniGameResponseInterface[] = []
  public content_blocks: ContentLayoutInterface[] = [{
    img: {
      src: 'assets/content/landing/rpg.png',
      alt: ''
    },
    info: {
      headline: 'RPG-система',
      text: 'Мы используем простую и понятную RPG-систему, состоящую всего из трех пунктов:',
      delay: (idx, len) => 0.3 + (idx+1) * 0.2,
      activities: [{
        headline: 'Повышай',
        text: 'Повышайте свой уровень',
        icon: 'arrow-big-up',
        iconStroked: true
      },{
        headline: 'Улучшай',
        text: 'Прокачивайте свои способности',
        icon: 'sword',
        iconStroked: true
      },{
        headline: 'Сражайся',
        text: 'Сражайтесь против боссов',
        icon: 'swords',
        iconStroked: true
      }]
    }
  },
    {
      img: {
        src: 'assets/content/landing/history-points.png',
        alt: ''
      },
      info: {
        headline: 'Очки сюжета',
        text: 'За каждую выигранную игру вы получаете очки сюжета, которые можно использовать для прохождения увлекательной истории.',
        delay: (idx, len) => 0.3 + len * 0.2 - (idx+1) * 0.2,
        activities: [{
          headline: 'Побеждай',
          text: 'Побеждай игроков в мини-играх',
          icon: 'trophy',
          iconStroked: true
        },{
          headline: 'Лутай',
          text: 'Одолевай и лутай боссов!',
          icon: 'skull',
          iconStroked: true
        },{
          headline: 'Открывай',
          text: 'Открывай сюжетные истории',
          icon: 'key',
          iconStroked: true
        }]
      }
    }];

  ngOnInit() {
    this.initForms()
    this.access_token = !!this.systemUserService.getAccessToken();
    this.appStore.setIsHomePage(true)
    this.subscriptions.push(
      this.appStore.isLogged$.pipe(
        tap((val) => {
          this.isLogged = val
        }),
        filter((val) => val),
        switchMap(() => this.appStore.user$),
        tap((user) => this.form.patchValue({email: user?.email})),
        switchMap(() => this.miniGamesService.getMiniGames()),
        tap((list) => this.miniGames = list),
        finalize(() => this.dataLoading = false)
      ).subscribe()
    )
    this.subscriptions.push(
      this.appStore.preloading$.subscribe((val) => this.preloading = val)
    )
  }
  ngOnDestroy() {
    this.appStore.setIsHomePage(false)
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  private initForms(): void {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      message: [null, [Validators.required, Validators.maxLength(512)]]
    })
  }

  public getMiniGamesText(): string {
    const length: number = this.miniGames.length
    let output: string = 'На нашем сервере вы найдете много увлекательных режимов. Играйте сами и зовите друзей.'
    if (length > 2) output = `На нашем сервере вы найдете более ${length-1} увлекательных режимов. Играйте сами и зовите друзей.`
    return output
  }
}
