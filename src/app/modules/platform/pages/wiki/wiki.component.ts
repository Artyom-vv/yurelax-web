import { Component } from '@angular/core';
import {AppearanceAnimation} from "../../../shared/animations/redirect.animation";
import {AppStore} from "../../../../store/app.store";
import {AnimationsService} from "../../../shared/animations/services/animations.service";

@Component({
  selector: 'yrx-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
  animations: [
    AppearanceAnimation,
  ]
})
export class WikiComponent {
  constructor(
    private appStore: AppStore,
    public animationsService: AnimationsService,
  ) {
  }
}
