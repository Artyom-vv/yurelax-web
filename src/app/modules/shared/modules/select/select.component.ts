import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {OptionInterface} from "./interfaces/option.interface";
import {MatSelect} from "@angular/material/select";
import {OptionSelectOutputInterface} from "../dropout-point/interfaces/option-select-output.interface";


@Component({
    selector: 'yrx-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ],
    standalone: false
})
export class SelectComponent implements AfterViewInit {

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
  }

  @ViewChild('select') select!: MatSelect
  @Input() options: OptionInterface[] = []
  @Input() placeholder: string = ''
  @Input() custom: 'dark' | null = null
  @Input() size: 'big' | 'normal' | 'small' = 'normal'


  onChange: any = () => {};
  onTouch: any = () => {};

  public selectedOption?: OptionSelectOutputInterface;
  public value: unknown = null;

  ngAfterViewInit() {
    const option = this.value ? this.options.find(x => x.value === this.value) : this.options[0];
    if (option) {
      const {icon, value, iconStroked} = option
      this.selectedOption = {
        value,
        icon,
        iconStroked
      }
    }
    this.cdr.detectChanges()
  }

  public onOptionSelect($event: OptionSelectOutputInterface): void {
    this.selectedOption = $event
    this.onChange($event.value)
    this.cdr.detectChanges()
    if (this.select && this.select.panelOpen)
      this.select.close()
  }

  public closed() {
    this.onTouch();
  }

  writeValue(value: unknown): void {
    this.value = value;
    const option = this.options.find(candidate => candidate.value === value);
    if (option) {
      this.selectedOption = {
        value: option.value,
        icon: option.icon,
        iconStroked: option.iconStroked
      };
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
