import {Component} from '@angular/core';
import {AnimationsService} from "../../../../../shared/animations/services/animations.service";
import {AppearanceAnimation} from "../../../../../shared/animations/redirect.animation";

@Component({
  selector: 'yrx-wiki-content',
  templateUrl: './wiki-content.component.html',
  styleUrls: ['./wiki-content.component.scss'],
  animations: [
    AppearanceAnimation
  ]
})
export class WikiContentComponent {

  constructor(
    public animationsService: AnimationsService,
  ) {
  }
}
