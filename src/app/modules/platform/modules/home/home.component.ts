import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {SystemUserService} from "../../../shared/services/system-user.service";
import {ContentLayoutInterface} from "./components/content-layout/interfaces/content-layout.interface";

@Component({
  selector: 'yrx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore,
    private systemUserService: SystemUserService
  ) {
  }

  private subscriptions: Subscription[] = []

  public isLogged: boolean = false;
  public preloading: boolean = true;
  public dataLoading: boolean = true;
  public access_token: boolean = false;
  public content_blocks: ContentLayoutInterface[] = [{
    img: {
      src: 'assets/content/landing/rpg.png',
      alt: ''
    },
    info: {
      headline: 'RPG-система',
      text: 'Мы используем простую и понятную систему прокачки персонажа, которая состоит всего из трех пунктов:',
      activities: [{
        headline: 'Повышай',
        text: 'Повышайте уровень персонажа',
        icon: 'arrow-big-up',
        iconStroked: true
      },{
        headline: 'Улучшай',
        text: 'Прокачивайте способности',
        icon: 'sword',
        iconStroked: true
      },{
        headline: 'Побеждай',
        text: 'Соревнуйся с другими игроками',
        icon: 'trophy',
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
        text: 'За каждую выигранную игру вы получаете очки сюжета, которые можно использовать для прохождения увлекательной компании.',
        activities: [{
          headline: 'Побеждай',
          text: 'Побеждай игроков в мини-играх',
          icon: 'trophy',
          iconStroked: true
        },{
          headline: 'Открывай',
          text: 'Открывай сюжетные компании',
          icon: 'trophy',
          iconStroked: true
        },{
          headline: 'Лутай',
          text: 'Побеждай и лутай боссов!',
          icon: 'trophy',
          iconStroked: true
        }]
      }
    }];

  ngOnInit() {
    this.access_token = !!this.systemUserService.getAccessToken();
    this.appStore.setIsHomePage(true)
    this.subscriptions.push(
      this.appStore.isLogged$.pipe(
        tap((val) => {
          this.isLogged = val
          this.dataLoading = false;
        })
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
}
