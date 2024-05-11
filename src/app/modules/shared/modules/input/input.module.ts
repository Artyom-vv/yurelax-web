import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { InputDirective } from './directives/input.directive';



@NgModule({
  declarations: [
    InputComponent,
    InputDirective
  ],
  imports: [
    CommonModule
  ]
})
export class InputModule { }
