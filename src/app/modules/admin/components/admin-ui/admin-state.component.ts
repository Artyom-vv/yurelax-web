import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-admin-state',
  standalone: false,
  templateUrl: './admin-state.component.html',
  styleUrls: ['./admin-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Reusable loading and empty state with stable spacing and hierarchy. */
export class AdminStateComponent {
  @Input({required: true}) title = '';
  @Input() description = '';
  @Input() loading = false;
  @Input() compact = false;
}
