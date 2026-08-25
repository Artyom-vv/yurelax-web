import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AdminUiModule} from '../../components/admin-ui/admin-ui.module';
import {ButtonModule} from '../../../shared/modules/button/button.module';
import {SpacingModule} from '../../../shared/modules/spacing/spacing.module';
import {AdminAuditService} from '../../../shared/services/admin-audit.service';
import {AdminAuditComponent} from './admin-audit.component';
import {AdminAuditRoutingModule} from './admin-audit-routing.module';

@NgModule({
  declarations: [AdminAuditComponent],
  imports: [CommonModule, FormsModule, ButtonModule, SpacingModule, AdminUiModule, AdminAuditRoutingModule],
  providers: [AdminAuditService],
})
export class AdminAuditModule {}
