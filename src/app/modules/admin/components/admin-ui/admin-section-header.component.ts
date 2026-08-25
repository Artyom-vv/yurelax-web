import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-admin-section-header',
  templateUrl: './admin-section-header.component.html',
  styleUrls: ['./admin-section-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
/** Shared section heading for registry, editor and review regions. */
export class AdminSectionHeaderComponent {
  @Input({required: true}) title = '';
  @Input() description = '';
  @Input() index = '';
}
