import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, Subscription, takeUntil, tap} from "rxjs";
import {MiniGamesService} from "../../../shared/services/mini-games.service";
import {MiniGameResponseInterface} from "../../../shared/interfaces/old/mini-game-response.interface";
import {StatisticsResponseInterface} from "../../../shared/interfaces/old/statistics-response.interface";
import {catchError} from "rxjs/operators";
import {RequestsCancellerService} from "../../../shared/services/requests-canceller.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'yrx-mini-games',
  templateUrl: './mini-games.component.html',
  styleUrls: ['./mini-games.component.scss']
})
export class MiniGamesComponent implements OnInit, OnDestroy {
  constructor(
    private requestsCancellerService: RequestsCancellerService,
    private _snackBar: MatSnackBar,
    private miniGamesService: MiniGamesService,
  ) {
  }

  private subscriptions: Subscription[] = []

  public miniGames: MiniGameResponseInterface[] = []
  public dataLoading: boolean = false;

  ngOnInit() {
    this.dataFields()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public getList() {
    this.dataLoading = true
    this.miniGamesService.getMiniGames().pipe(
      takeUntil(this.requestsCancellerService.destroy$),
      tap((list) => {
        this.miniGames = list;
      }),
      finalize(() => this.dataLoading = false),
      catchError((err) => {
        this._snackBar.open(err.error.message, "Закрыть")
        throw new Error(err)
      })
    ).subscribe()
  }

  public onCreate($event: MiniGameResponseInterface) {
    this.getList()
  }

  public onUpdate($event: MiniGameResponseInterface) {
    this.miniGames[this.miniGames.findIndex(x => x.miniGameKey === $event.miniGameKey)] = $event
  }

  public onDelete($event: MiniGameResponseInterface) {
    this.miniGames = this.miniGames.filter(x => x.miniGameKey !== $event.miniGameKey);
  }


  private dataFields(): void {
    this.getList()
  }
}
