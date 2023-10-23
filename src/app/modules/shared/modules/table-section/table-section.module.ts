import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableSectionComponent} from './table-section.component';

@NgModule({
  declarations: [
    TableSectionComponent
  ],
  exports: [
    TableSectionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TableSectionModule {
}
