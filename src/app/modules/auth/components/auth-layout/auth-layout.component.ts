import {Component, Input, OnInit} from '@angular/core';
import {SwipeAnimation} from "../../../shared/animations/redirect.animation";
import {AnimationsService} from "../../../shared/animations/services/animations.service";
import {animate, query, style, transition, trigger} from "@angular/animations";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'yrx-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  animations: [
    SwipeAnimation
  ]
})
export class AuthLayoutComponent implements OnInit {
  constructor(
    public animationsService: AnimationsService
  ) {
  }

  @Input() outlet!: RouterOutlet;

  ngOnInit() {

  }
}
