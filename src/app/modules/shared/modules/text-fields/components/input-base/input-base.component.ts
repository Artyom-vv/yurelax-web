import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorHintWrapperModule} from "../../../error-hint-wrapper/error-hint-wrapper.module";
import {BaseComponentInputDirective} from "../../directives/base-component-input.directive";

@Component({
    selector: 'yrx-input-base',
    templateUrl: './input-base.component.html',
    styleUrls: ['./input-base.component.scss'],
    imports: [
        CommonModule,
        ErrorHintWrapperModule
    ]
})
export class InputBaseComponent {

  constructor(
    public baseComponent: BaseComponentInputDirective,
  ) {
  }

  get classes() {
    return {
      [`box_` + this.baseComponent.baseDirective.tagName.toLowerCase()]: true
    }
  }

}
