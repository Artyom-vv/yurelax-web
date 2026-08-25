import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from '../../../shared/modules/button/button.module';
import {SpacingModule} from '../../../shared/modules/spacing/spacing.module';
import {AdminPlayersService} from '../../../shared/services/admin-players.service';
import {AdminPlayersComponent} from './admin-players.component';
import {AdminPlayersRoutingModule} from './admin-players-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AdminUiModule} from '../../components/admin-ui/admin-ui.module';
import {CommerceOriginModule} from '../../../shared/modules/commerce-origin/commerce-origin.module';
import {EntitlementLifecycleActionComponent} from './components/entitlement-lifecycle-action/entitlement-lifecycle-action.component';

@NgModule({
  declarations: [AdminPlayersComponent, EntitlementLifecycleActionComponent],
  imports: [CommonModule, FormsModule, ButtonModule, SpacingModule, MatSnackBarModule,
    CommerceOriginModule, AdminUiModule, AdminPlayersRoutingModule],
  providers: [AdminPlayersService],
})
export class AdminPlayersModule {}
