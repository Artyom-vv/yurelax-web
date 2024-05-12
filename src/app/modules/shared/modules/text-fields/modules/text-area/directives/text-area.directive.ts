import {booleanAttribute, Directive, HostBinding, Input} from '@angular/core';
import {BaseInputDirective} from "../../../directives/base-input.directive";

@Directive({
  selector: '[yrxTextArea]',
  hostDirectives: [
    BaseInputDirective
  ]
})
export class TextAreaDirective {

  @Input({transform: booleanAttribute}) controls: boolean = false

  constructor(
    public base: BaseInputDirective
  ) {
  }

  @HostBinding('class')
  get classes() {
    return {
      'textarea': true,
    }
  }

}
