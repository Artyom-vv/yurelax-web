import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, finalize, of, tap} from 'rxjs';
import {
  CreatePlatformStatDefinition,
  PlatformStatDefinition,
  StatisticsService,
} from '../../../shared/services/statistics.service';

@Component({
    selector: 'yrx-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
    standalone: false
})
export class StatisticsComponent implements OnInit {
  public definitions: PlatformStatDefinition[] = [];
  public loading = true;
  public mutating = false;
  public search = '';
  public form: FormGroup;

  constructor(
    private readonly statistics: StatisticsService,
    private readonly snackBar: MatSnackBar,
    formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_.-]{1,127}$/)]],
      valueKind: ['BIGINT', Validators.required],
      aggregationKind: ['SUM', Validators.required],
      unit: [''],
      allowNegative: [false],
    });
  }

  ngOnInit(): void { this.load(); }

  get visibleDefinitions(): PlatformStatDefinition[] {
    const query = this.search.trim().toLowerCase();
    return query ? this.definitions.filter(item => item.code.includes(query)) : this.definitions;
  }

  create(): void {
    if (this.form.invalid || this.mutating) return;
    const value = this.form.getRawValue();
    const input: CreatePlatformStatDefinition = {
      code: value.code,
      valueKind: value.valueKind,
      aggregationKind: value.aggregationKind,
      allowNegative: value.allowNegative,
      ...(value.unit?.trim() ? {unit: value.unit.trim()} : {}),
    };
    this.mutating = true;
    this.statistics.create(input).pipe(
      tap(created => {
        this.definitions = [...this.definitions, created];
        this.form.reset({valueKind: 'BIGINT', aggregationKind: 'SUM', allowNegative: false, unit: ''});
        this.snackBar.open(`Контракт ${created.code} создан`, 'Хорошо');
      }),
      catchError(error => {
        this.snackBar.open(error?.error?.message ?? 'Не удалось создать контракт', 'Закрыть');
        return of(null);
      }),
      finalize(() => this.mutating = false),
    ).subscribe();
  }

  deactivate(definition: PlatformStatDefinition): void {
    if (this.mutating || !definition.active) return;
    this.mutating = true;
    this.statistics.deactivate(definition.id, 'Retired from the web administration cabinet').pipe(
      tap(updated => {
        this.definitions = this.definitions.map(item => item.id === updated.id ? updated : item);
        this.snackBar.open(`Контракт ${updated.code} деактивирован; история сохранена`, 'Хорошо');
      }),
      catchError(error => {
        this.snackBar.open(error?.error?.message ?? 'Не удалось деактивировать контракт', 'Закрыть');
        return of(null);
      }),
      finalize(() => this.mutating = false),
    ).subscribe();
  }

  private load(): void {
    this.loading = true;
    this.statistics.list().pipe(
      tap(page => this.definitions = page.items),
      catchError(error => {
        this.snackBar.open(error?.error?.message ?? 'Не удалось загрузить контракты', 'Закрыть');
        return of(null);
      }),
      finalize(() => this.loading = false),
    ).subscribe();
  }
}
