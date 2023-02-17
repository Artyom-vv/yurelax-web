import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStore} from "../../../../store/app.store";

@Component({
  selector: 'yrx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private appStore: AppStore
  ) {
  }

  ngOnInit() {
    this.appStore.setIsHomePage(true)
  }
  ngOnDestroy() {
    this.appStore.setIsHomePage(false)
  }
}
