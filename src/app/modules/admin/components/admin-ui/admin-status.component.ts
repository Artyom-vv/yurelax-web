import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

export type AdminStatusTone = 'neutral' | 'positive' | 'warning' | 'danger';

@Component({
  selector: 'yrx-admin-status',
  template: '<span class="admin-status admin-status_{{tone}}"><span class="admin-status__dot"></span>{{label}}</span>',
  styleUrls: ['./admin-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
/** Text-first status indicator that never relies on colour alone. */
export class AdminStatusComponent {
  @Input({required: true}) label = '';
  @Input() tone: AdminStatusTone = 'neutral';
}
