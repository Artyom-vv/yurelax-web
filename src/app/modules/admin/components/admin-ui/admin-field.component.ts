import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-admin-field',
  templateUrl: './admin-field.component.html',
  styleUrls: ['./admin-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
/** A labelled admin form field that keeps labels, controls and help text on one rhythm. */
export class AdminFieldComponent {
  @Input({required: true}) label = '';
  @Input() hint = '';
  @Input() required = false;
  @Input() compact = false;
}
