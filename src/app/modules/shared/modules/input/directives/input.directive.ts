import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[yrxInput]'
})
export class InputDirective {

  @Input() disabled: boolean = false;
  @Input() controls: boolean = true;
  @Input() custom: InputCustom = ''
  @Input() size: InputSize = 'big';
  @Input() status?: InputStatus;
  @Input() class: string = '';
  @Input() placeholder: string = '';
  @Input() styleType: InputType = 'outlined'
  @Input() placeholderSuffix: string = ' *'

  constructor() { }

}
