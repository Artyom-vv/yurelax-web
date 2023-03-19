import {Component, Input, ViewChild} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {OptionInterface} from "./interfaces/option.interface";
import {MatSelect} from "@angular/material/select";
import {OptionSelectOutputInterface} from "../dropout-point/interfaces/option-select-output.interface";

@Component({
  selector: 'yrx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @ViewChild('select') select!: MatSelect
  @Input() control: AbstractControl | null = null;
  @Input() options: OptionInterface[] = []
  @Input() placeholder: string = ''
  @Input() default: number = 0
  @Input() size: 'big' | 'normal' | 'small' = 'normal'
  @Input() custom: 'dark' | null = null

  public selectedOption: OptionSelectOutputInterface | null = null;

  public onOptionSelect($event: OptionSelectOutputInterface): void {
    this.selectedOption = $event
    this.select.close()
  }
}
