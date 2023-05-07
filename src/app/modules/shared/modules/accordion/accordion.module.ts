import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from './components/accordion-item/accordion-item.component';



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
        CommonModule
    ]
})
export class AccordionModule { }
