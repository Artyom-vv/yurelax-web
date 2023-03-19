import {AfterViewInit, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {RouterLinkActive} from "@angular/router";
import {MatSelect} from "@angular/material/select";
import {OptionSelectOutputInterface} from "./interfaces/option-select-output.interface";

@Component({
  selector: 'yrx-dropout-point',
  templateUrl: './dropout-point.component.html',
  styleUrls: ['./dropout-point.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropoutPointComponent implements AfterViewInit {
  @Input() size: 'big' | 'normal' | 'small' = 'normal'
  @Input() icon: string = ''
  @Input() iconStroked: boolean = false
  @Input() underlined: boolean = true
  @Input() default: boolean = false
  @Input() optionCustom: 'dark' | null = null
  @Input() rla?: RouterLinkActive
  @Input() value: string | number | boolean | null = null;
  @Input() isOption: boolean = false;
  @Output() press: EventEmitter<any> = new EventEmitter<any>()
  @Output() optionSelect: EventEmitter<OptionSelectOutputInterface> = new EventEmitter<OptionSelectOutputInterface>()

  ngAfterViewInit() {
    if (this.default) {
      this.onOptionSelect()
    }
  }

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
