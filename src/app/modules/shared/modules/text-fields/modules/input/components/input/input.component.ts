import {AfterViewInit, Component, ContentChild} from '@angular/core';
import {InputDirective} from "../../directives/input.directive";
import {BaseComponentInputDirective} from "../../../../directives/base-component-input.directive";

@Component({
  selector: 'yrx-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  hostDirectives: [
    BaseComponentInputDirective
  ]
})
export class InputComponent implements AfterViewInit {

  @ContentChild(InputDirective, {descendants: true}) directive!: InputDirective

  ngAfterViewInit() {
    if (!this.directive) {
      throw Error('The input must contain the yrxInput directive')
    }
  }
}
