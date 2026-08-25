import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileHomeComponent} from './profile-home.component';
import {ProfileHomeRoutingModule} from "./profile-home-routing.module";
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {ProfileUserPanelModule} from "../../modules/profile-user-panel/profile-user-panel.module";
import {RouterModule} from '@angular/router';
import {SkinsViewerModule} from '../../modules/skins-viewer/skins-viewer.module';
import {SalesOfferModule} from '../../modules/sales-offer/sales-offer.module';
import {VotingModule} from '../../modules/voting/voting.module';
import {StatisticModule} from '../../modules/statistic/statistic.module';
import {RewardsModule} from '../../modules/rewards/rewards.module';

@NgModule({
  declarations: [
    ProfileHomeComponent,
  ],
  imports: [
    CommonModule,
    ProfileHomeRoutingModule,
    SpacingModule,
    ProfileUserPanelModule,
    SkinsViewerModule,
    SalesOfferModule,
    VotingModule,
    StatisticModule,
    RewardsModule,
    RouterModule,
  ],
})
export class ProfileHomeModule {

}
