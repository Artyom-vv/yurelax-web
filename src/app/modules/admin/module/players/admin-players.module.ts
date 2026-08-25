import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from '../../../shared/modules/button/button.module';
import {SpacingModule} from '../../../shared/modules/spacing/spacing.module';
import {AdminPlayersService} from '../../../shared/services/admin-players.service';
import {AdminPlayersComponent} from './admin-players.component';
import {AdminPlayersRoutingModule} from './admin-players-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [AdminPlayersComponent],
  imports: [CommonModule, FormsModule, ButtonModule, SpacingModule, MatSnackBarModule, AdminPlayersRoutingModule],
  providers: [AdminPlayersService],
})
export class AdminPlayersModule {}
