import {Component, OnDestroy, OnInit} from '@angular/core';
import {RatingTableInterface} from "../../../../../shared/modules/rating-table/interfaces/rating-table.interface";
import {MiniGamesService} from "../../../../../shared/services/mini-games.service";
import {EMPTY, finalize, first, forkJoin, map, Observable, Subscription, switchMap, tap} from "rxjs";
import {MiniGameResponseInterface} from "../../../../../shared/interfaces/mini-game-response.interface";
import {UserStatisticsService} from "../../../../../shared/services/user-statistics.service";
import {StatisticsResponseInterface} from "../../../../../shared/interfaces/statistics-response.interface";
import {StatisticsService} from "../../../../../shared/services/statistics.service";
import {UserStatisticsResponseInterface} from "../../../../../shared/interfaces/user-statistics-response.interface";
import {GetTopPlayersItemResponseInterface} from "../../../../../shared/interfaces/get-top-players-response.interface";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'yrx-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.scss']
})
export class TopPlayersComponent implements OnInit, OnDestroy {

  constructor(
    private miniGamesService: MiniGamesService,
    private userStatisticsService: UserStatisticsService,
    private statisticsService: StatisticsService,
    private _snackBar: MatSnackBar
  ) {
  }

  private subscriptions: Subscription[] = []

  columns: string[] = []
  tableData: RatingTableInterface[] = []
  public currentMonth: number = new Date().getMonth() + 1
  public month: string = ''
  public miniGames: MiniGameResponseInterface[] = []
  public miniGameKey: string = ''
  public miniGameLoadingKey: string | null = null

  ngOnInit() {
    this.month = this.getMonthString()
    this.subscriptions.push(
      this.miniGamesService.getMiniGames().pipe(
        tap((response) => {
          this.miniGames = response
          this.selectTab(response[0])
        })
      ).subscribe()
    )

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  public getMonthString(): string {
    switch (this.currentMonth) {
      case 1:
        return 'январь'
      case 2:
        return 'февраль'
      case 3:
        return 'март'
      case 4:
        return 'апрель'
      case 5:
        return 'май'
      case 6:
        return 'июнь'
      case 7:
        return 'июль'
      case 8:
        return 'август'
      case 9:
        return 'сентябрь'
      case 10:
        return 'октябрь'
      case 11:
        return 'ноябрь'
      case 12:
        return 'декабрь'
      default:
        return ''
    }
  }

  public selectTab(game: MiniGameResponseInterface) {
    this.miniGameKey = game.miniGameKey
    this.miniGameLoadingKey = game.miniGameKey
    this.userStatisticsService.getTopPlayers({
      miniGameKey: game.miniGameKey,
      filterByKey: game.filteredByKey,
      keys: game.keys,
      limit: 8
    }).pipe(
      first(),
      switchMap((statistics) => {
        const observables: Observable<string>[] = []
        game.keys.forEach((key) => {
          observables.push(this.statisticsService.getStatistics(key).pipe(map((res) => res.title)))
        })
        return observables.length > 0 ? forkJoin(observables).pipe(tap(() => {
          this.tableData = statistics.map(item => ({
            login: item.login,
            values: item.statistics.map(x => x.monthlyValue)
          }))
        })) : EMPTY
      }),
      tap((columns) => {
        this.columns = columns
      }),
      finalize(() => {
        this.miniGameLoadingKey = null
      }),
      catchError((err) => {
        this._snackBar.open(err.error.message,"Закрыть")
        throw Error(err)
      })
    ).subscribe()
  }
}
