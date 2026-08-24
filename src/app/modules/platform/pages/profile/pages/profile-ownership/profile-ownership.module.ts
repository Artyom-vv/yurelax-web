import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ButtonModule} from '../../../../../shared/modules/button/button.module';
import {SpacingModule} from '../../../../../shared/modules/spacing/spacing.module';
import {ProfileOwnershipRoutingModule} from './profile-ownership-routing.module';
import {ProfileOwnershipComponent} from './profile-ownership.component';

@NgModule({
  declarations: [ProfileOwnershipComponent],
  imports: [CommonModule, ButtonModule, SpacingModule, ProfileOwnershipRoutingModule]
})
export class ProfileOwnershipModule {}
