import {
  booleanAttribute,
  Directive, ElementRef,
  HostBinding,
  Input,
  Optional,
} from '@angular/core';
import {NgControl, Validators} from "@angular/forms";
import {ComponentSizes} from "../../../interfaces/ui-kit.interface";

@Directive({
  selector: '[yrxBaseInput]',
  standalone: true,
})
export class BaseInputDirective {

  @Input({transform: booleanAttribute}) disabled: boolean = false
  @Input() suffix: string = ' *'
  @Input() size: ComponentSizes = 'normal'
  @Input() placeholder: string = ''

  public value: string = ''

  constructor(
    @Optional() public ngControl: NgControl | null,
    public element: ElementRef<HTMLElement>
  ) {}

  @HostBinding('class')
  get classes() {
    return {
      'input': true,
      [`input_${this.size}`]: true,
      'input_dirty': this.control?.dirty,
      'input_touched': this.control?.touched,
      'input_disabled': this.disabled
    }
  }

  get tagName() {
    return this.element.nativeElement.tagName
  }

  get control() {
    return this.ngControl?.control
  }

  @HostBinding(`placeholder`)
  get getPlaceholder() {
    return this.control?.hasValidator(Validators.required)
      ? this.placeholder + this.suffix
      : this.placeholder
  }

}
