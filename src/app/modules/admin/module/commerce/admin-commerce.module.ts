import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SpacingModule} from '../../../shared/modules/spacing/spacing.module';
import {AdminCommerceService} from '../../../shared/services/admin-commerce.service';
import {AdminCommerceRoutingModule} from './admin-commerce-routing.module';
import {AdminCommerceComponent} from './admin-commerce.component';
import {ButtonModule} from '../../../shared/modules/button/button.module';
import {AdminUiModule} from '../../components/admin-ui/admin-ui.module';
import {CommerceFulfillmentBoardComponent} from './components/commerce-fulfillment-board/commerce-fulfillment-board.component';

@NgModule({
  declarations: [AdminCommerceComponent, CommerceFulfillmentBoardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, SpacingModule, ButtonModule, AdminUiModule, AdminCommerceRoutingModule],
  providers: [AdminCommerceService],
})
export class AdminCommerceModule {}
