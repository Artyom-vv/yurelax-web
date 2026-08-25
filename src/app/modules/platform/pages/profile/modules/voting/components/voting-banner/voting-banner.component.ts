import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'yrx-voting-banner',
    templateUrl: './voting-banner.component.html',
    styleUrls: ['./voting-banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class VotingBannerComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() icon = 'trophy';
}
