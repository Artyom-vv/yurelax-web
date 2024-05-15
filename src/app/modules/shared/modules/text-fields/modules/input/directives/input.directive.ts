import {Directive, Optional} from '@angular/core';
import {BaseInputDirective} from "../../../directives/base-input.directive";
import {IconDirective} from "../../../../../directives/icon.directive";

@Directive({
  selector: '[yrxInput]',
  hostDirectives: [
    {
      directive: BaseInputDirective,
      inputs: [
        'suffix',
        'placeholder'
      ]
    }
  ]
})
export class InputDirective {

  constructor(
    @Optional() public icon: IconDirective,
    public base: BaseInputDirective
  ) {
  }
}
