import {Component, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {OptionInterface} from "../../../../../shared/modules/select/interfaces/option.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

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
    {text: 'Hunt статистика', value: 2, icon: 'crosshair', iconStroked: true},
    {text: 'Stay Alive статистика', value: 3, icon: 'shield', iconStroked: true},
    {text: 'Tower Defence статистика', value: 4, icon: 'boxes', iconStroked: true},
  ]
  public readonly statistics: Record<number, string[]> = {
    1: ['Сыграно игр', 'Побед', 'Времени в игре', 'Получено опыта'],
    2: ['Сыграно матчей', 'Побед', 'Убийств', 'Нанесено урона', 'Получено опыта'],
    3: ['Сыграно матчей', 'Лучшее время', 'Побед', 'Получено опыта'],
    4: ['Сыграно матчей', 'Отражено волн', 'Построено башен', 'Получено опыта'],
  };

  private subscriptions: Subscription[] = []

  public form!: FormGroup;

  public get visibleStatistics(): string[] {
    return this.statistics[this.form?.get('statisticType')?.value ?? 1] ?? [];
  }

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
  }
}
