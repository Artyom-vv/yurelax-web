import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-admin-registry',
  template: '<section class="admin-registry" [attr.aria-label]="ariaLabel || null"><ng-content></ng-content></section>',
  styleUrls: ['./admin-registry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
/** Continuous list surface for comparable admin records. */
export class AdminRegistryComponent {
  @Input() ariaLabel = '';
}

@Component({
  selector: 'yrx-admin-registry-row',
  template: '<div class="admin-registry-row"><ng-content></ng-content></div>',
  styleUrls: ['./admin-registry-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
/** One row in a registry. Page content defines the task-specific lanes. */
export class AdminRegistryRowComponent {}
