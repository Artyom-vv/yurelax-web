import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from './accordion.component';
import {AccordionItemComponent} from './components/accordion-item/accordion-item.component';
import {SpacingModule} from "../spacing/spacing.module";
import {IconModule} from "../icon/icon.module";
import {ToolsService} from "../../services/tools.service";


@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemComponent
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent
  ],
  imports: [
    CommonModule,
    SpacingModule,
    IconModule
  ],
  providers: [
    ToolsService
  ]
})
export class AccordionModule {
}
