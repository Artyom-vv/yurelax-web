import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from './admin.component';
import {AuthGuard} from "../shared/services/guards/auth.guard";
import {LayoutModule} from "../shared/modules/layout/layout.module";
import {RoleGuard} from "../shared/services/guards/role-guard.service";
import {SidebarModule} from "../platform/modules/sidebar/sidebar.module";
import {SpacingModule} from "../shared/modules/spacing/spacing.module";
import {LinkModule} from "../shared/modules/link/link.module";
import {AdminContentComponent} from './components/admin-content/admin-content.component';
import {AdminStore} from "./store/admin.store";

@NgModule({
  declarations: [
    AdminComponent,
    AdminContentComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    SidebarModule,
    SpacingModule,
    LinkModule
  ],
  providers: [AuthGuard, RoleGuard, AdminStore]
})
export class AdminModule {
}
