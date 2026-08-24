import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'yrx-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss'],
    animations: [
        trigger('slideDown', [
            transition('* => true', [
                style({
                    transform: 'translateY(-10%)',
                    opacity: 0.5
                }),
                animate('0.2s {{delay}}s ease', style({
                    transform: 'translateY(0)',
                    opacity: 1
                }))
            ])
        ])
    ],
    standalone: false
})
export class ActivityComponent {

  public animate: boolean = false

  @Input() delay: number = 0;

  onEntry($event: boolean) {
    this.animate = $event;
  }
}
