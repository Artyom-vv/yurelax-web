import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUserPanelComponent } from './profile-user-panel.component';
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {IconModule} from "../../../../../shared/modules/icon/icon.module";
import {ButtonModule} from "../../../../../shared/modules/button/button.module";
import {SkeletonModule} from "../../../../../shared/modules/skeleton/skeleton.module";



@NgModule({
    declarations: [
        ProfileUserPanelComponent
    ],
    exports: [
        ProfileUserPanelComponent
    ],
    imports: [
        CommonModule,
        SpacingModule,
        IconModule,
        ButtonModule,
        SkeletonModule
    ]
})
export class ProfileUserPanelModule { }
