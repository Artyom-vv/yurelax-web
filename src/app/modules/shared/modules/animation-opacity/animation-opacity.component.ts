import { Component, Input } from '@angular/core';
import {Opacity} from "../../animations/redirect.animation";

@Component({
  selector: 'yrx-animation-opacity',
  templateUrl: './animation-opacity.component.html',
  styleUrls: ['./animation-opacity.component.scss'],
  animations: [
    Opacity
  ]
})
export class AnimationOpacityComponent {

  @Input() always: boolean = true;
  @Input() timing: number = 1.5;

  public animate: boolean = false;

  onEntry($event: boolean) {
    if (this.always) {
      this.animate = $event;
    } else {
      if (!this.animate) {
        this.animate = $event;
      }
    }
  }
}
