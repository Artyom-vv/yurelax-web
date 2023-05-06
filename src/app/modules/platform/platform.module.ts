import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlatformRoutingModule} from "./platform-routing.module";
import {PlatformComponent} from './platform.component';
import {LayoutModule} from "../shared/modules/layout/layout.module";
import {HeaderModule} from "../shared/modules/header/header.module";
import {HomeModule} from "./modules/home/home.module";
import {RoleGuard} from "../shared/services/guards/role-guard.service";
import {SpacingModule} from "../shared/modules/spacing/spacing.module";
import {UserService} from "./services/user.service";
import {AuthGuard} from "../shared/services/guards/auth.guard";
import {ToolsService} from "../shared/services/tools.service";


@NgModule({
  declarations: [
    PlatformComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    LayoutModule,
    HeaderModule,
    HomeModule,
    SpacingModule
  ],
  providers: [RoleGuard, UserService, AuthGuard, ToolsService]
})
export class PlatformModule {
}
