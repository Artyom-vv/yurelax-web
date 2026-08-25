import {booleanAttribute, Directive, HostBinding, Input} from '@angular/core';
import {BaseInputDirective} from "../../../directives/base-input.directive";

@Directive({
    selector: '[yrxTextArea]',
    hostDirectives: [
        {
            directive: BaseInputDirective,
            inputs: [
                'disabled',
                'size',
                'suffix',
                'placeholder'
            ]
        }
    ],
    standalone: false
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
