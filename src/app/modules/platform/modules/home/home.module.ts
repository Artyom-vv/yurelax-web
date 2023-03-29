import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {RouterLink} from "@angular/router";
import {SkeletonModule} from "../../../shared/modules/skeleton/skeleton.module";
import { FeatureComponent } from './components/feature/feature.component';
import { OnlineComponent } from './components/online/online.component';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { InfoLayoutComponent } from './components/info-layout/info-layout.component';
import { ActivityComponent } from './components/activity/activity.component';
import {ClipboardModule} from "../../../shared/directives/clipboard/clipboard.module";


@NgModule({
  declarations: [
    HomeComponent,
    FeatureComponent,
    OnlineComponent,
    ContentLayoutComponent,
    InfoLayoutComponent,
    ActivityComponent
  ],
    imports: [
        CommonModule,
        SpacingModule,
        ButtonModule,
        IconModule,
        RouterLink,
        SkeletonModule,
        ClipboardModule
    ]
})
export class HomeModule {
}
