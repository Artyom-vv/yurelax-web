import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Entry page that delegates identity verification to the platform OIDC flow. */
export class LoginComponent {
  private readonly route = inject(ActivatedRoute);

  login(): void {
    const requested = this.route.snapshot.queryParamMap.get('returnTo');
    const returnTo = requested?.startsWith('/') && !requested.startsWith('//') ? requested : '/cabinet';
    window.location.assign(`/api/session/login?returnTo=${encodeURIComponent(returnTo)}`);
  }
}
