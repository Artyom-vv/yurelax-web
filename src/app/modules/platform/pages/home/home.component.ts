import {Component, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {catchError, EMPTY, filter, finalize, Subscription, switchMap, tap} from "rxjs";
import {ContentLayoutInterface} from "./components/content-layout/interfaces/content-layout.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlatformGameCatalogService, PublicGame} from "../../../shared/services/platform-game-catalog.service";

@Component({
    selector: 'yrx-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore,
    private fb: FormBuilder,
    private gameCatalog: PlatformGameCatalogService
  ) {
  }

  private subscriptions: Subscription[] = []

  public form!: FormGroup

  public isLogged: boolean = false;
  public preloading: boolean = true;
  public dataLoading: boolean = true;
  public messageLoading: boolean = false;
  public access_token: boolean = false;
  public miniGames: PublicGame[] = []
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
    this.appStore.setIsHomePage(true)
    this.subscriptions.push(
      this.appStore.isLogged$.pipe(
        tap((val) => {
          this.isLogged = val
          this.access_token = val
        }),
        filter((val) => val),
        switchMap(() => this.appStore.user$),
        tap((user) => this.form.patchValue({email: user?.email})),
      ).subscribe()
    )
    this.subscriptions.push(this.gameCatalog.list().pipe(
      tap((page) => this.miniGames = page.items),
      catchError(() => EMPTY),
      finalize(() => this.dataLoading = false),
    ).subscribe())
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
