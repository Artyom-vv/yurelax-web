import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonatePanelComponent } from './donate-panel.component';
import {IconModule} from "../../../../../../../shared/modules/icon/icon.module";
import {ButtonModule} from "../../../../../../../shared/modules/button/button.module";
import {CoinModule} from "../../../../../../../shared/modules/coin/coin.module";



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
    CoinModule
  ]
})
export class DonatePanelModule { }
