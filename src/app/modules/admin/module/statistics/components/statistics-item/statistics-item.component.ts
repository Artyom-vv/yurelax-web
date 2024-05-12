import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {StatisticsResponseInterface} from "../../../../../shared/interfaces/old/statistics-response.interface";
import {StatisticsService} from "../../../../../shared/services/statistics.service";
import {delay, finalize, first, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AnimationsService} from "../../../../../shared/animations/services/animations.service";
import {DELETE_DURATION} from "../../../../admin.constants";

@Component({
  selector: 'yrx-statistics-item',
  templateUrl: './statistics-item.component.html',
  styleUrls: ['./statistics-item.component.scss'],
})
export class StatisticsItemComponent implements AfterViewInit {

  constructor(
    private statisticsService: StatisticsService,
    private _snackBar: MatSnackBar,
    private animationsService: AnimationsService
  ) {
  }

  @ViewChild('item') item!: ElementRef
  @Input() index: number = 0;
  @Input() data!: StatisticsResponseInterface
  @Output() onUpdate: EventEmitter<StatisticsResponseInterface> = new EventEmitter<StatisticsResponseInterface>()
  @Output() onDelete: EventEmitter<StatisticsResponseInterface> = new EventEmitter<StatisticsResponseInterface>()

  public isEdit: boolean = false
  public isDelete: boolean = false;
  public dataLoading: boolean = false;
  public isInit: boolean = true;

  ngAfterViewInit() {
    this.animationsService.slideAnimation(300 + (this.index + 1) * 100, this.item)
  }

  public edit() {
    this.isEdit = true
  }

  public delete() {
    this.isDelete = true;
  }

  public onCancel() {
    this.isEdit = false
    this.isDelete = false
  }

  public onUpdateHandler($event: StatisticsResponseInterface) {
    this.isEdit = false
    this.animationsService.slideAnimation(300, this.item)
    this.onUpdate.emit($event)
  }

  public deleteApi() {
    this.dataLoading = true
    this.statisticsService.deleteStatistics(this.data.key).pipe(
      first(),
      tap(() => {
        this.isInit = false
        this.animationsService.deleteAnimation(DELETE_DURATION, this.item);
      }),
      delay(DELETE_DURATION - 5),
      tap((res) => this.onDelete.emit(res)),
      finalize(() => {
        this.dataLoading = false
        this.isDelete = false;
      }),
      catchError((err) => {
        this._snackBar.open(err.error.message, "Закрыть")
        throw new Error(err)
      })
    ).subscribe()
  }
}
