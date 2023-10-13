import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerService} from "../../../../../shared/services/server.service";
import {finalize, interval, Observable, retry, retryWhen, Subscription, switchMap, tap} from "rxjs";
import {ToolsService} from "../../../../../shared/services/tools.service";
import {GetOnlineResponseInterface} from "../../../../../shared/interfaces/get-online-response.interface";

@Component({
  selector: 'yrx-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent implements OnInit, OnDestroy {
  constructor(
    private serverService: ServerService,
    public toolsService: ToolsService
  ) {
  }

  private subscriptions: Subscription[] = []

  public online: number = 0;
  public dataLoading: boolean = true;
  public onlineRequest$: Observable<GetOnlineResponseInterface> = this.serverService.getOnline().pipe(
    tap(({online}) => {
      this.online = online
    })
  )

  ngOnInit() {
    this.subscriptions.push(this.onlineRequest$.pipe(finalize(() => this.dataLoading = false)).subscribe())
    this.subscriptions.push(
      interval(5000).pipe(
        switchMap(() => this.onlineRequest$),
        retryWhen(errors => errors.pipe(retry(1)))
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
