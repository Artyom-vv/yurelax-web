import {Component, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FaqInterface} from "./interfaces/faq.interface";
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {SocialStoreInterface} from "../../../../../../store/interfaces/socials-store.interface";

@Component({
    selector: 'yrx-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FaqComponent {

  public data: FaqInterface[] = [
    {
      question: 'Нужна ли лицензия?',
      answer: 'Нет, игра на нашем сервере доступна как на пиратской версии, так и на лицензионной версии игры Minecraft.',
    },
    {
      question: 'Зачем нужна подписка?',
      answer: 'Приобретая подписку, вы получаете полноценный доступ к возможностям сервера, в зависимости от выбранного тарифа.',
    },
    {
      question: 'Доступен ли сервер на Bedrock Edition?',
      answer: 'Нет, сервер доступен только на Java версии для ПК.',
    },
    {
      question: 'Можно ли вернуть деньги?',
      answer: 'Да, возврат средств осуществляется, если вы наиграли менее 2 часов, а с момента оплаты прошло не более 7 дней. Возврат доступен только для Qiwi и банковских карт в РФ.',
    },
    {
      question: 'С кем мы сотрудничаем?',
      answer: 'С обладателями вк группы, телеграм или ютуб канала с охватом от 1 000 человек. Условия сотрудничества(ссылка)',
    },
  ]
}
