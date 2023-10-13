import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PromoCodeComponent} from './promo-code.component';
import {SpacingModule} from "../../../../../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../../../../../shared/modules/button/button.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {RefIconModule} from "../../../../../shared/modules/ref-icon/ref-icon.module";


@NgModule({
  declarations: [
    PromoCodeComponent
  ],
  exports: [
    PromoCodeComponent
  ],
  imports: [
    CommonModule,
    SpacingModule,
    ButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    RefIconModule
  ]
})
export class PromoCodeModule {
}
