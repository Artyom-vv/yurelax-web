import {ContentChild, ContentChildren, Directive, QueryList} from '@angular/core';
import {BaseInputDirective} from "./base-input.directive";
import {
  ErrorHintFieldComponent
} from "../../error-hint-wrapper/components/error-hint-field/error-hint-field.component";
import {IconDirective} from "../../../directives/icon/icon.directive";

@Directive({
  selector: '[yrxBaseComponentInput]',
  standalone: true
})
export class BaseComponentInputDirective {

  @ContentChild(BaseInputDirective) baseDirective!: BaseInputDirective
  @ContentChild(IconDirective) icon?: IconDirective
  @ContentChildren(ErrorHintFieldComponent, {descendants: true}) hints?: QueryList<ErrorHintFieldComponent>

  constructor() { }

  get isLeftIcon() {
    return Boolean(this.icon?.isLeftIcon)
  }

  get isRightIcon() {
    return Boolean(this.icon?.isRightIcon)
  }
}
