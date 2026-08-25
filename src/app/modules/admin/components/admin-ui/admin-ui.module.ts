import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AdminPageHeaderComponent} from './admin-page-header.component';
import {AdminStateComponent} from './admin-state.component';
import {AdminFieldComponent} from './admin-field.component';
import {AdminSectionHeaderComponent} from './admin-section-header.component';
import {AdminRegistryComponent, AdminRegistryRowComponent} from './admin-registry.component';
import {AdminStatusComponent} from './admin-status.component';

const ADMIN_UI_COMPONENTS = [
  AdminPageHeaderComponent,
  AdminStateComponent,
  AdminFieldComponent,
  AdminSectionHeaderComponent,
  AdminRegistryComponent,
  AdminRegistryRowComponent,
  AdminStatusComponent,
];

@NgModule({
  declarations: ADMIN_UI_COMPONENTS,
  imports: [CommonModule],
  exports: ADMIN_UI_COMPONENTS,
})
/** Shared visual primitives for lazy-loaded admin workspaces. */
export class AdminUiModule {}
