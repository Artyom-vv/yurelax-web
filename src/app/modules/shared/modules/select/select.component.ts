import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, forwardRef, Inject,
  Input,
  ViewChild,
  DOCUMENT
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {OptionInterface} from "./interfaces/option.interface";
import {MatSelect} from "@angular/material/select";
import {OptionSelectOutputInterface} from "../dropout-point/interfaces/option-select-output.interface";
import {SelectService} from "./services/select.service";


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
    private selectService: SelectService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  @ViewChild('select') select!: MatSelect
  @ViewChild('boxSelect') boxSelect!: ElementRef
  @Input() options: OptionInterface[] = []
  @Input() placeholder: string = ''
  @Input() custom: 'dark' | null = null
  @Input() size: 'big' | 'normal' | 'small' = 'normal'


  onChange: any = () => {};
  onTouch: any = () => {};

  public selectedOption?: OptionSelectOutputInterface;
  public isAbove: boolean = false;
  public value: boolean = false;

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

  public opened() {
    this.selectService.openBlocker(this.boxSelect);
    this.isAbove = !!this.document.documentElement.querySelector('.mat-mdc-select-panel-above')
  }

  public closed() {
    this.selectService.closeBlocker()
  }

  writeValue(value: boolean): void {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
