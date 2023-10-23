import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DonateModalComponent} from './donate-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RefIconModule} from "../../../../../../../shared/modules/ref-icon/ref-icon.module";
import {SpacingModule} from "../../../../../../../shared/modules/spacing/spacing.module";
import {PromoCodeModule} from "../../../../modules/promo-code/promo-code.module";
import {DonatePanelModule} from "../donate-panel/donate-panel.module";
import {LinkModule} from "../../../../../../../shared/modules/link/link.module";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    DonateModalComponent,
  ],
    imports: [
        CommonModule,
        MatDialogModule,
        RefIconModule,
        SpacingModule,
        PromoCodeModule,
        DonatePanelModule,
        LinkModule,
        RouterLink
    ],
})
export class DonateModalModule {
}
