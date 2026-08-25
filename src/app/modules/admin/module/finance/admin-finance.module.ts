import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ButtonModule} from '../../../shared/modules/button/button.module';
import {SpacingModule} from '../../../shared/modules/spacing/spacing.module';
import {AdminCommerceService} from '../../../shared/services/admin-commerce.service';
import {AdminFinanceService} from '../../../shared/services/admin-finance.service';
import {AdminPlayersService} from '../../../shared/services/admin-players.service';
import {AdminFinanceComponent} from './admin-finance.component';
import {AdminFinanceRoutingModule} from './admin-finance-routing.module';
@NgModule({declarations:[AdminFinanceComponent],imports:[CommonModule,FormsModule,ReactiveFormsModule,MatSnackBarModule,ButtonModule,SpacingModule,AdminFinanceRoutingModule],providers:[AdminFinanceService,AdminCommerceService,AdminPlayersService]})
export class AdminFinanceModule {}
