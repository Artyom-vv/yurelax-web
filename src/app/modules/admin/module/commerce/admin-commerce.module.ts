import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SpacingModule} from '../../../shared/modules/spacing/spacing.module';
import {AdminCommerceService} from '../../../shared/services/admin-commerce.service';
import {AdminCommerceRoutingModule} from './admin-commerce-routing.module';
import {AdminCommerceComponent} from './admin-commerce.component';

@NgModule({
  declarations: [AdminCommerceComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, SpacingModule, AdminCommerceRoutingModule],
  providers: [AdminCommerceService],
})
export class AdminCommerceModule {}
