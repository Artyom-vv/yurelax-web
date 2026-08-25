import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-admin-page-header',
  standalone: false,
  templateUrl: './admin-page-header.component.html',
  styleUrls: ['./admin-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Shared heading region for every admin workspace. */
export class AdminPageHeaderComponent {
  @Input({required: true}) eyebrow = '';
  @Input({required: true}) title = '';
  @Input({required: true}) description = '';
  @Input() surface = false;
}
