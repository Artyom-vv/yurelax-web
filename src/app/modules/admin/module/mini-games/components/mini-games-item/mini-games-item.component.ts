import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AnimationsService} from "../../../../../shared/animations/services/animations.service";
import {MiniGamesService} from "../../../../../shared/services/mini-games.service";
import {MiniGameResponseInterface} from "../../../../../shared/interfaces/old/mini-game-response.interface";
import {delay, finalize, first, tap} from "rxjs";
import {DELETE_DURATION} from "../../../../admin.constants";
import {catchError} from "rxjs/operators";

@Component({
    selector: 'yrx-mini-games-item',
    templateUrl: './mini-games-item.component.html',
    styleUrls: ['./mini-games-item.component.scss'],
    standalone: false
})
export class MiniGamesItemComponent {
  constructor(
    private miniGamesService: MiniGamesService,
    private _snackBar: MatSnackBar,
    private animationsService: AnimationsService
  ) {
  }

  @ViewChild('item') item!: ElementRef
  @Input() index: number = 0;
  @Input() data!: MiniGameResponseInterface
  @Output() onUpdate: EventEmitter<MiniGameResponseInterface> = new EventEmitter<MiniGameResponseInterface>()
  @Output() onDelete: EventEmitter<MiniGameResponseInterface> = new EventEmitter<MiniGameResponseInterface>()

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

  public onUpdateHandler($event: MiniGameResponseInterface) {
    this.isEdit = false
    this.animationsService.slideAnimation(300, this.item)
    this.onUpdate.emit($event)
  }

  public deleteApi() {
    this.dataLoading = true
    this.miniGamesService.deleteMiniGame(this.data.miniGameKey).pipe(
      first(),
      tap(() => {
        this.isInit = false
        this.animationsService.deleteAnimation(DELETE_DURATION, this.item);
      }),
      delay(DELETE_DURATION - 5),
      tap(() => this.onDelete.emit(this.data)),
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
