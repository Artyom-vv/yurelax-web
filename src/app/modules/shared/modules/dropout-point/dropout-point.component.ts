import {Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {OptionSelectOutputInterface} from "./interfaces/option-select-output.interface";
import {RouterLinkActive} from "@angular/router";

@Component({
    selector: 'yrx-dropout-point',
    templateUrl: './dropout-point.component.html',
    styleUrls: ['./dropout-point.component.scss'],
    standalone: false
})
export class DropoutPointComponent {
  @Input() size: 'big' | 'normal' | 'small' = 'normal'
  @Input() icon: string = ''
  @Input() iconStroked: boolean = false
  @Input() underlined: boolean = true
  @Input() link?: string;
  @Input() selected: boolean = false
  @Input() optionCustom: 'dark' | null = null
  @Input() value: string | number | boolean | null = null;
  @Input() isOption: boolean = false;
  @Output() press: EventEmitter<any> = new EventEmitter<any>()
  @Output() optionSelect: EventEmitter<OptionSelectOutputInterface> = new EventEmitter<OptionSelectOutputInterface>()
  @ViewChild('routerLinkActive') routerLinkActive?: RouterLinkActive;

  public onClick($event: any): void {
    this.press.emit($event)
    this.onOptionSelect()
  }

  public onOptionSelect(): void {
    if (this.isOption) {
      this.optionSelect.emit({
        icon: this.icon,
        iconStroked: this.iconStroked,
        value: this.value
      });
    }
  }

}
