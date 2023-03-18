import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesOfferComponent } from './sales-offer.component';
import {ButtonModule} from "../../../../../shared/modules/button/button.module";



@NgModule({
  declarations: [
    SalesOfferComponent
  ],
  exports: [
    SalesOfferComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class SalesOfferModule { }
