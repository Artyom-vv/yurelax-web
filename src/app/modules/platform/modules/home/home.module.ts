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
import {
  ErrorHintConditionModule
} from "../../../shared/modules/error-hint-wrapper/modules/error-hint-condition/error-hint-condition.module";
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
import {ToolsService} from "../../../shared/services/tools.service";
import {SocialPanelModule} from "../../../shared/modules/social-panel/social-panel.module";


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
        ErrorHintConditionModule,
        RatingTableModule,
        SelectorPointModule,
        MatSnackBarModule,
        MatExpansionModule,
        AccordionModule,
        SocialPanelModule,
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
