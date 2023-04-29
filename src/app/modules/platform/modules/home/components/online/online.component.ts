import {Component, OnInit} from '@angular/core';
import {ServerService} from "../../../../../shared/services/server.service";
import {finalize, interval, retry, retryWhen, switchMap, tap} from "rxjs";

@Component({
  selector: 'yrx-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent implements OnInit {
  constructor(
    private serverService: ServerService
  ) {
  }

  public online: number = 0;
  public dataLoading: boolean = false;

  ngOnInit() {
    interval(5000).pipe(
      switchMap(() => this.serverService.getOnline()),
      tap(({online}) => this.online = online),
      finalize(() => this.dataLoading = false),
      retryWhen(errors => errors.pipe(retry(1)))
    ).subscribe()
  }

}
