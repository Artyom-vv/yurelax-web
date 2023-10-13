import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesOfferComponent } from './sales-offer.component';
import {ButtonModule} from "../../../../../shared/modules/button/button.module";
import {CoinModule} from "../../../../../shared/modules/coin/coin.module";



@NgModule({
  declarations: [
    SalesOfferComponent
  ],
  exports: [
    SalesOfferComponent
  ],
    imports: [
        CommonModule,
        ButtonModule,
        CoinModule
    ]
})
export class SalesOfferModule { }
