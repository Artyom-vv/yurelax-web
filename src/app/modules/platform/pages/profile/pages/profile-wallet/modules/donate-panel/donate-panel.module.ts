import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonatePanelComponent } from './donate-panel.component';
import {IconModule} from "../../../../../../../shared/modules/icon/icon.module";
import {ButtonModule} from "../../../../../../../shared/modules/button/button.module";
import {CoinModule} from "../../../../../../../shared/modules/coin/coin.module";
import {RefIconModule} from "../../../../../../../shared/modules/ref-icon/ref-icon.module";



@NgModule({
  declarations: [
    DonatePanelComponent
  ],
  exports: [
    DonatePanelComponent
  ],
    imports: [
        CommonModule,
        IconModule,
        ButtonModule,
        CoinModule,
        RefIconModule
    ]
})
export class DonatePanelModule { }
