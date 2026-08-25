import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AdminPageHeaderComponent} from './admin-page-header.component';
import {AdminStateComponent} from './admin-state.component';

@NgModule({
  declarations: [AdminPageHeaderComponent, AdminStateComponent],
  imports: [CommonModule],
  exports: [AdminPageHeaderComponent, AdminStateComponent],
})
/** Shared visual primitives for lazy-loaded admin workspaces. */
export class AdminUiModule {}
