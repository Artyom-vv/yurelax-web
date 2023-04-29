import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {StatisticsResponseInterface} from "../../../../../shared/interfaces/statistics-response.interface";
import {StatisticsService} from "../../../../../shared/services/statistics.service";
import {delay, finalize, first, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {animate, style} from "@angular/animations";
import {AnimationsService} from "../../../../../shared/animations/services/animations.service";

const deleteDuration: number = 300;

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
    this.slideAnimation(300 + (this.index + 1) * 100)
  }

  public slideAnimation(duration: number) {
    this.animationsService.playAnimation([
      style({
        opacity: 0,
        transform: 'translateY(-15px)'
      }),
      animate(duration + 'ms ease-out', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
    ], this.item.nativeElement)
  }

  public deleteAnimation() {
    this.animationsService.playAnimation([
      style({
        opacity: 1
      }),
      animate(deleteDuration + 'ms ease-in-out', style({
        opacity: 0,
        zIndex: 1,
        position: 'relative',
        marginTop: '-' + this.item.nativeElement.getBoundingClientRect().height + 'px',
      })),
    ], this.item.nativeElement)
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
    this.slideAnimation(300)
    this.onUpdate.emit($event)
  }

  public deleteApi() {
    this.dataLoading = true
    this.statisticsService.deleteStatistics(this.data.key).pipe(
      first(),
      tap(() => {
        this.isInit = false
        this.deleteAnimation();
      }),
      delay(deleteDuration - 5),
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
