import { Component } from '@angular/core';
import {OptionInterface} from "../../../../../shared/modules/select/interfaces/option.interface";

@Component({
  selector: 'yrx-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent {
  public options: OptionInterface[] = [
    {text: 'Общая статистика', value: 1, icon: 'box', iconStroked: true},
    {text: 'Hunt статистика', value: 2, icon: 'shopping-bag', iconStroked: true},
    {text: 'Stay Alive статистика', value: 3, icon: 'laptop', iconStroked: true},
    {text: 'Tower Defence статистика', value: 4, icon: 'settings', iconStroked: true},
  ]
}
