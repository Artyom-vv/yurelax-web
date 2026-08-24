import {Component, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {OptionInterface} from "../../../../../shared/modules/select/interfaces/option.interface";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, tap} from "rxjs";

@Component({
    selector: 'yrx-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class StatisticComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder
  ) {
  }

  public options: OptionInterface[] = [
    {text: 'Общая статистика', value: 1, icon: 'box', iconStroked: true},
    {text: 'Hunt статистика', value: 2, icon: 'shopping-bag', iconStroked: true},
    {text: 'Stay Alive статистика', value: 3, icon: 'laptop', iconStroked: true},
    {text: 'Tower Defence статистика', value: 4, icon: 'settings', iconStroked: true},
  ]
  public statistics: any[] = [1,2,3,4,5,6]

  private subscriptions: Subscription[] = []

  public form!: FormGroup

  ngOnInit() {
    this.initForms()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  private initForms(): void {
    this.form = this.fb.group({
      statisticType: [1, [Validators.required]]
    })
    this.subscriptions.push(
      this.form.valueChanges.pipe(
        tap((value) => {
          console.log(value)
        })
      ).subscribe()
    )
  }
}
