import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ButtonModule} from '../../../../../shared/modules/button/button.module';
import {SpacingModule} from '../../../../../shared/modules/spacing/spacing.module';
import {ProfileOwnershipRoutingModule} from './profile-ownership-routing.module';
import {ProfileOwnershipComponent} from './profile-ownership.component';
import {CommerceOriginModule} from '../../../../../shared/modules/commerce-origin/commerce-origin.module';

@NgModule({
  declarations: [ProfileOwnershipComponent],
  imports: [CommonModule, ButtonModule, SpacingModule, CommerceOriginModule, ProfileOwnershipRoutingModule]
})
export class ProfileOwnershipModule {}
