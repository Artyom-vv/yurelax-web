import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import {RouterLink} from "@angular/router";
import {IconModule} from "../icon/icon.module";
import {SpacingModule} from "../spacing/spacing.module";
import {ButtonModule} from "../button/button.module";
import {RefIconModule} from "../ref-icon/ref-icon.module";



@NgModule({
    declarations: [
        FooterComponent
    ],
    exports: [
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        IconModule,
        SpacingModule,
        ButtonModule,
        RefIconModule
    ]
})
export class FooterModule { }
