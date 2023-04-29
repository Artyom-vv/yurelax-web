import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {StatisticsService} from "../../../../../shared/services/statistics.service";
import {finalize, first, Subscription, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExistingStatisticsValidator} from "../../../../../shared/validators/existing-statistics.validator";
import {KeyValidator} from "../../../../../shared/validators/key.validator";
import {StatisticsResponseInterface} from "../../../../../shared/interfaces/statistics-response.interface";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'yrx-statistics-create',
  templateUrl: './statistics-create.component.html',
  styleUrls: ['./statistics-create.component.scss']
})
export class StatisticsCreateComponent implements AfterViewInit, OnDestroy {
  constructor(
    private statisticsService: StatisticsService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    protected cdr: ChangeDetectorRef
  ) {
  }

  @Input() data!: StatisticsResponseInterface;
  @Input() isEdit: boolean = false
  @Output() onCreate: EventEmitter<StatisticsResponseInterface> = new EventEmitter<StatisticsResponseInterface>();
  @Output() onUpdate: EventEmitter<StatisticsResponseInterface> = new EventEmitter<StatisticsResponseInterface>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  private subscriptions: Subscription[] = []

  public form!: FormGroup
  public dataLoading: boolean = false;

  ngOnInit() {
    this.initForms()
  }

  ngAfterViewInit() {
    if (this.isEdit) {
      this.form.patchValue(this.data)
      this.form.get('key')?.disable()
      this.cdr.detectChanges()
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public create(): void {
    this.dataLoading = true;
    this.subscriptions.push(
      this.statisticsService.createStatistics(this.form.getRawValue()).pipe(
        first(),
        tap((value) => {
          this.onCreate.emit(value);
          this.form.reset()
          this._snackBar.open(`Статистика "${value.title}" успешно создана`, 'Хорошо')
        }),
        finalize(() => this.dataLoading = false),
        catchError((err) => {
          this._snackBar.open(err.error.message, "Закрыть")
          throw new Error(err)
        })
      ).subscribe()
    )
  }

  public edit() {
    this.dataLoading = true;
    this.subscriptions.push(
      this.statisticsService.updateStatistics(this.form.getRawValue()).pipe(
        first(),
        tap((value) => {
          this.onUpdate.emit(value);
        }),
        finalize(() => this.dataLoading = false),
        catchError((err) => {
          this._snackBar.open(err.error.message, "Закрыть")
          throw new Error(err)
        })
      ).subscribe()
    )
  }

  public cancel() {
    this.onCancel.emit();
  }

  private initForms(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      key: [null, [Validators.required, KeyValidator()], [ExistingStatisticsValidator(this.statisticsService)]],
    })
  }
}
