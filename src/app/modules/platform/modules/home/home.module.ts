import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {RouterLink} from "@angular/router";
import {SkeletonModule} from "../../../shared/modules/skeleton/skeleton.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        SpacingModule,
        ButtonModule,
        IconModule,
        RouterLink,
        SkeletonModule
    ]
})
export class HomeModule {
}
