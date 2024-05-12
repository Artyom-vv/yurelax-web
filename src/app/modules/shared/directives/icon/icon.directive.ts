import {Directive, Input} from '@angular/core';
import {OptionalType} from "../../interfaces/shared.interface";

@Directive({
  selector: '[yrxIcon]'
})
export class IconDirective {

  @Input({transform: (value: string | undefined) => value ?? ''}) yrxIcon: OptionalType<'left' | 'right' | ''> = ''

  constructor() { }

  get isLeftIcon() {
    return Boolean(this.yrxIcon === 'left')
  }

  get isRightIcon() {
    return Boolean(this.yrxIcon === 'left')
  }

}
