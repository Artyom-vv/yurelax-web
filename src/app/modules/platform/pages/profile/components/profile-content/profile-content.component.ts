import {Component} from '@angular/core';
import {AppearanceAnimation} from "../../../../../shared/animations/redirect.animation";
import {AnimationsService} from "../../../../../shared/animations/services/animations.service";

@Component({
    selector: 'yrx-profile-content',
    templateUrl: './profile-content.component.html',
    styleUrls: ['./profile-content.component.scss'],
    animations: [
        AppearanceAnimation,
    ],
    standalone: false
})
export class ProfileContentComponent {
  constructor(
    public animationsService: AnimationsService
  ) {
  }
}
