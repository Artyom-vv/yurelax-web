import {Component, OnDestroy, OnInit} from '@angular/core';
import {OptionInterface} from "../../../../../shared/modules/select/interfaces/option.interface";
import {AbstractControl, FormControl} from "@angular/forms";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'yrx-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit, OnDestroy {
  public options: OptionInterface[] = [
    {text: 'Общая статистика', value: 1, icon: 'box', iconStroked: true},
    {text: 'Hunt статистика', value: 2, icon: 'shopping-bag', iconStroked: true},
    {text: 'Stay Alive статистика', value: 3, icon: 'laptop', iconStroked: true},
    {text: 'Tower Defence статистика', value: 4, icon: 'settings', iconStroked: true},
  ]

  private subscriptions: Subscription[] = []

  public statisticTypeControl: AbstractControl = new FormControl();

  ngOnInit() {
    this.subscriptions.push(
      this.statisticTypeControl.valueChanges.pipe(
        tap((value) => {
          console.log(value)
        })
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
