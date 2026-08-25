import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, finalize, of, tap} from 'rxjs';
import {OptionInterface} from '../../../../../shared/modules/select/interfaces/option.interface';
import {
  PlayerStatisticGroup,
  StatisticsService,
} from '../../../../../shared/services/statistics.service';

const ALL_GAME_GROUP = '__all__';

@Component({
  selector: 'yrx-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class StatisticComponent implements OnInit {
  public form!: FormGroup;
  public groups: PlayerStatisticGroup[] = [];
  public options: OptionInterface[] = [];
  public loading = true;
  public error = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly statistics: StatisticsService,
  ) {}

  public get selectedGroup(): PlayerStatisticGroup | undefined {
    const code = this.form?.get('gameCode')?.value;
    return this.groups.find(group => (group.gameCode ?? ALL_GAME_GROUP) === code);
  }

  ngOnInit(): void {
    this.form = this.fb.group({gameCode: [ALL_GAME_GROUP, [Validators.required]]});
    this.statistics.playerOverview().pipe(
      tap(overview => this.applyOverview(overview.groups)),
      catchError(error => {
        this.error = error?.error?.message ?? 'Не удалось загрузить статистику.';
        return of(null);
      }),
      finalize(() => this.loading = false),
    ).subscribe();
  }

  public value(value: string | boolean): string {
    if (typeof value === 'boolean') return value ? 'Да' : 'Нет';
    return value;
  }

  private applyOverview(groups: PlayerStatisticGroup[]): void {
    this.groups = groups;
    this.options = groups.map(group => ({
      text: group.gameName,
      value: group.gameCode ?? ALL_GAME_GROUP,
      icon: group.gameCode ? 'joystick' : 'box',
      iconStroked: true,
    }));
  }
}
