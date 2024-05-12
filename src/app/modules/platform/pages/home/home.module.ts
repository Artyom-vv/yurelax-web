import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {RouterLink} from "@angular/router";
import {SkeletonModule} from "../../../shared/modules/skeleton/skeleton.module";
import {FeatureComponent} from './components/feature/feature.component';
import {OnlineComponent} from './components/online/online.component';
import {ContentLayoutComponent} from './components/content-layout/content-layout.component';
import {InfoLayoutComponent} from './components/info-layout/info-layout.component';
import {ActivityComponent} from './components/activity/activity.component';
import {ClipboardModule} from "../../../shared/directives/clipboard/clipboard.module";
import {OfferComponent} from './components/offer/offer.component';
import {ErrorHintWrapperModule} from "../../../shared/modules/error-hint-wrapper/error-hint-wrapper.module";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {TopPlayersComponent} from './components/top-players/top-players.component';
import {RatingTableModule} from "../../../shared/modules/rating-table/rating-table.module";
import {SelectorPointModule} from "../../../shared/modules/selector-point/selector-point.module";
import {MiniGamesService} from "../../../shared/services/mini-games.service";
import {StatisticsService} from "../../../shared/services/statistics.service";
import {UserStatisticsService} from "../../../shared/services/user-statistics.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ServerService} from "../../../shared/services/server.service";
import {FaqComponent} from './components/faq/faq.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {AccordionModule} from "../../../shared/modules/accordion/accordion.module";
import {SocialPanelModule} from "../../../shared/modules/social-panel/social-panel.module";
import {InViewModule} from "../../../shared/directives/in-view/in-view.module";
import {AnimationOpacityModule} from "../../../shared/modules/animation-opacity/animation-opacity.module";
import {RefIconModule} from "../../../shared/modules/ref-icon/ref-icon.module";
import {TextAreaModule} from "../../../shared/modules/text-fields/modules/text-area/text-area.module";
import {InputModule} from "../../../shared/modules/text-fields/modules/input/input.module";

@NgModule({
  declarations: [
    HomeComponent,
    FeatureComponent,
    OnlineComponent,
    ContentLayoutComponent,
    InfoLayoutComponent,
    ActivityComponent,
    OfferComponent,
    TopPlayersComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    SpacingModule,
    ButtonModule,
    IconModule,
    RouterLink,
    SkeletonModule,
    ClipboardModule,
    ErrorHintWrapperModule,
    MatInputModule,
    ReactiveFormsModule,
    RatingTableModule,
    SelectorPointModule,
    MatSnackBarModule,
    MatExpansionModule,
    AccordionModule,
    SocialPanelModule,
    InViewModule,
    AnimationOpacityModule,
    RefIconModule,
    TextAreaModule,
    InputModule,
  ],
  providers: [
    MiniGamesService,
    StatisticsService,
    UserStatisticsService,
    ServerService,
  ]
})
export class HomeModule {
}
