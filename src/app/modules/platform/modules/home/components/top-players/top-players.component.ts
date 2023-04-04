import {Component, OnDestroy, OnInit} from '@angular/core';
import {RatingTableInterface} from "../../../../../shared/modules/rating-table/interfaces/rating-table.interface";
import {MiniGamesService} from "../../../../../shared/services/mini-games.service";
import {Subscription, tap} from "rxjs";
import {MiniGameResponseInterface} from "../../../../../shared/interfaces/mini-game-response.interface";

@Component({
  selector: 'yrx-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.scss']
})
export class TopPlayersComponent implements OnInit, OnDestroy {

  constructor(
    private miniGamesService: MiniGamesService
  ) {
  }

  private subscriptions: Subscription[] = []

  columns: string[] = ["Кол-во смертей", "Кол-во киллов", "Кол-во опыта"]
  taleData: RatingTableInterface[] = [
    {login: "SuPPick", values: [100, 1000, 10000]},
    {login: "VorkGame", values: [100, 1000, 10000]},
    {login: "Kotew", values: [100, 1000, 10000]},
  ]
  public currentMonth: number = new Date().getMonth()+1
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
          if (response.length>0)
          this.miniGameKey = response[0].miniGameKey
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

  public selectTab(miniGameKey: string) {
    this.miniGameKey = miniGameKey
    this.miniGameLoadingKey = miniGameKey
    setTimeout(() => this.miniGameLoadingKey = null, 1000)
  }
}
