import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AdminUiModule} from '../../components/admin-ui/admin-ui.module';
import {ButtonModule} from '../../../shared/modules/button/button.module';
import {SpacingModule} from '../../../shared/modules/spacing/spacing.module';
import {AdminPlayersService} from '../../../shared/services/admin-players.service';
import {AdminPrivacyService} from '../../../shared/services/admin-privacy.service';
import {AdminPrivacyComponent} from './admin-privacy.component';
import {AdminPrivacyRoutingModule} from './admin-privacy-routing.module';

@NgModule({
  declarations: [AdminPrivacyComponent],
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, ButtonModule, SpacingModule, AdminUiModule, AdminPrivacyRoutingModule],
  providers: [AdminPrivacyService, AdminPlayersService],
})
export class AdminPrivacyModule {}
