import {Component, Input} from '@angular/core';
import {SubscriptionRes} from "../../interfaces/subscription.interface";

@Component({
  selector: 'yrx-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
  @Input() data!: SubscriptionRes

  getClasses(item: any): {[key: string]: boolean} {
    return {
      ['text_' + item.weight]: true,
      'c-gradation-100': item.weight === 'medium',
      'c-gradation-300': item.weight !== 'medium'
    };
  }

}
