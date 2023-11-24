import {Component} from '@angular/core';
import {SubscriptionRes} from "./interfaces/subscription.interface";

@Component({
  selector: 'yrx-profile-store',
  templateUrl: './profile-store.component.html',
  styleUrls: ['./profile-store.component.scss']
})
export class ProfileStoreComponent {
  public subscriptions: SubscriptionRes[] = [
    {
      name: 'Продвинутый',
      cost: 229,
      color: '#FFD071',
      decorationFirst: 'assets/content/blocks/golden-block/1.png',
      decorationSecond: 'assets/content/blocks/golden-block/2.png',
      decorationThird: 'assets/content/blocks/golden-block/3.png',
      information: [
        [{
          text: 'Открывается доступ ко всем мини-играм',
          weight: 'regular'
        }],
        [{
          text: 'Доступен ежедневный кит бустеров',
          weight: 'regular'
        }],
        [{
          text: 'Открывается доступ к миссиям компании',
          weight: 'regular'
        }],
      ]
    },
    {
      name: 'Премиум',
      cost: 329,
      color: '#96C2EE',
      decorationFirst: 'assets/content/blocks/diamond-block/1.png',
      decorationSecond: 'assets/content/blocks/diamond-block/2.png',
      decorationThird: 'assets/content/blocks/diamond-block/3.png',
      information: [
        [{
          text: 'Открывается доступ ко всем мини-играм',
          weight: 'regular'
        }],
        [
          {
            text: 'Доступен ежедневный ',
            weight: 'regular'
          },
          {
            text: 'кит редких бустеров',
            weight: 'medium'
          },
        ],
        [{
          text: 'Открывается доступ к миссиям компании',
          weight: 'regular'
        }],
        [{
          text: 'Открывается подбор и пропуск миссий компаний',
          weight: 'regular'
        }],
      ]
    },
    {
      name: 'Мифический',
      cost: 729,
      color: '#F28A8E',
      decorationFirst: 'assets/content/blocks/nether-block/1.png',
      decorationSecond: 'assets/content/blocks/nether-block/2.png',
      decorationThird: 'assets/content/blocks/nether-block/3.png',
      information: [
        [{
          text: 'Полный доступ к тарифу “Премиум”',
          weight: 'medium'
        }],
        [
          {
            text: 'Редчайший лут с боссов компании',
            weight: 'regular'
          },
        ],
        [{
          text: 'Расширенная кастомизация (смена цвета ника, анимация при киллах и победах)',
          weight: 'regular'
        }],
        [{
          text: 'Доступ к оперативному каналу обратной связи',
          weight: 'regular'
        }],
      ]
    }
  ]
}
