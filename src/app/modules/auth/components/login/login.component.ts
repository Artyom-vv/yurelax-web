import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OpacityAnimation} from "../../animations/opacity.animation";
import {PlatformSessionService} from '../../../shared/services/platform-session.service';

@Component({
  selector: 'yrx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    OpacityAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(
    private readonly session: PlatformSessionService,
  ) {
  }

  public dataLoading: boolean = false;
  public transitionToMA: boolean = false;

  public login(): void {
    this.dataLoading = true;
    this.session.beginLogin('/platform/profile/home');
  }
}
