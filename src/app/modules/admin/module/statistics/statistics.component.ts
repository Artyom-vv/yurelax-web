import {Component, OnInit} from '@angular/core';
import {StatisticsResponseInterface} from "../../../shared/interfaces/statistics-response.interface";
import {StatisticsService} from "../../../shared/services/statistics.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {debounceTime, distinctUntilChanged, finalize, takeUntil, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RequestsCancellerService} from "../../../shared/services/requests-canceller.service";

@Component({
  selector: 'yrx-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(
    private statisticsService: StatisticsService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private requestsCancellerService: RequestsCancellerService
  ) {
  }

  public statisticsList: StatisticsResponseInterface[] = []
  public dataLoading: boolean = false;

  public form!: FormGroup

  ngOnInit() {
    this.initForms()
    this.watchForms()
    this.getList()
  }

  public onCreate($event: StatisticsResponseInterface) {
    this.getList()
  }
  public onUpdate($event: StatisticsResponseInterface) {
    this.statisticsList[this.statisticsList.findIndex(x => x.key === $event.key)] = $event
  }
  public onDelete($event: StatisticsResponseInterface) {
    this.statisticsList = this.statisticsList.filter(x => x.key !== $event.key);
  }

  public getList() {
    this.dataLoading = true
    this.statisticsService.getStatisticsList({value: this.form.getRawValue().value}).pipe(
      takeUntil(this.requestsCancellerService.destroy$),
      tap((list) => {
        this.statisticsList = list;
      }),
      finalize(() => this.dataLoading = false),
      catchError((err) => {
        this._snackBar.open(err.error.message, "Закрыть")
        throw new Error(err)
      })
    ).subscribe()
  }

  private initForms(): void {
    this.form = this.fb.group({
      value: [null]
    })
  }
  private watchForms(): void {
    this.form.get('value')?.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      tap(() => {
        this.requestsCancellerService.cancel()
        this.getList()
      })
    ).subscribe()
  }
}
