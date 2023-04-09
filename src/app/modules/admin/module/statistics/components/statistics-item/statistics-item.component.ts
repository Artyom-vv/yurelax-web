import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StatisticsResponseInterface} from "../../../../../shared/interfaces/statistics-response.interface";
import {StatisticsService} from "../../../../../shared/services/statistics.service";
import {finalize, first, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'yrx-statistics-item',
  templateUrl: './statistics-item.component.html',
  styleUrls: ['./statistics-item.component.scss']
})
export class StatisticsItemComponent {

  constructor(
    private statisticsService: StatisticsService,
    private _snackBar: MatSnackBar
  ) {
  }

  @Input() data!: StatisticsResponseInterface
  @Output() onUpdate: EventEmitter<StatisticsResponseInterface> = new EventEmitter<StatisticsResponseInterface>()
  @Output() onDelete: EventEmitter<StatisticsResponseInterface> = new EventEmitter<StatisticsResponseInterface>()

  public isEdit: boolean = false;
  public dataLoading: boolean = false;

  public edit() {
    this.isEdit = true;
  }

  public onUpdateHandler($event: StatisticsResponseInterface) {
    this.isEdit = false;
    this.onUpdate.emit($event)
  }

  public delete() {
    this.dataLoading = true
    this.statisticsService.deleteStatistics(this.data.key).pipe(
      first(),
      tap((res) => {
        this.onDelete.emit(res);
      }),
      finalize(() => this.dataLoading = false),
      catchError((err) => {
        this._snackBar.open(err.error.message, "Закрыть")
        throw new Error(err)
      })
    ).subscribe()
  }
}
