import { Component } from '@angular/core';
import {BaseComponentInputDirective} from "../../../../directives/base-component-input.directive";

@Component({
  selector: 'yrx-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  hostDirectives: [
    BaseComponentInputDirective
  ]
})
export class TextAreaComponent {

}
