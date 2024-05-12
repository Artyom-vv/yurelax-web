import {Component} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'yrx-error-hint',
  templateUrl: './error-hint.component.html',
  styleUrls: ['./error-hint.component.scss'],
  animations: [
    trigger('slideDown', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('300ms ease', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
    ])
  ]
})
export class ErrorHintComponent {
}
