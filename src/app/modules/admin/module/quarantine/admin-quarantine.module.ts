import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AdminUiModule} from '../../components/admin-ui/admin-ui.module';
import {ButtonModule} from '../../../shared/modules/button/button.module';
import {SpacingModule} from '../../../shared/modules/spacing/spacing.module';
import {AdminQuarantineService} from '../../../shared/services/admin-quarantine.service';
import {AdminQuarantineComponent} from './admin-quarantine.component';
import {AdminQuarantineRoutingModule} from './admin-quarantine-routing.module';

@NgModule({
  declarations: [AdminQuarantineComponent],
  imports: [CommonModule, FormsModule, MatSnackBarModule, ButtonModule, SpacingModule, AdminUiModule, AdminQuarantineRoutingModule],
  providers: [AdminQuarantineService],
})
export class AdminQuarantineModule {}
