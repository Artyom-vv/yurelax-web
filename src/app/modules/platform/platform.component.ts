import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs";

@Component({
    selector: 'yrx-platform',
    templateUrl: './platform.component.html',
    styleUrls: ['./platform.component.scss'],
    standalone: false
})
export class PlatformComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {
  }

  public light: boolean = true;

  ngOnInit() {
    this.route.data.pipe(
      tap((data: any) => {
        this.light = data?.header?.light ?? true
      })
    ).subscribe()
  }
}
