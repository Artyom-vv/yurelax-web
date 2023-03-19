import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, Inject,
  Input,
  ViewChild
} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {OptionInterface} from "./interfaces/option.interface";
import {MatSelect} from "@angular/material/select";
import {OptionSelectOutputInterface} from "../dropout-point/interfaces/option-select-output.interface";
import {SelectService} from "./services/select.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'yrx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Input() control: AbstractControl | null = null;
  @Input() options: OptionInterface[] = []
  @Input() placeholder: string = ''
  @Input() default: number = 0
  @Input() custom: 'dark' | null = null
  @Input() size: 'big' | 'normal' | 'small' = 'normal'

  public selectedOption?: OptionSelectOutputInterface;
  public isAbove: boolean = false;

  ngAfterViewInit() {
    const value = this.control?.getRawValue();
    if (value) {
      this.selectedOption = {
        value,
        icon: null,
        iconStroked: null
      }
    } else {
      const standard: OptionInterface | undefined = this.options.find((o, idx) => idx === this.default);
      if (standard) {
        const {icon, value, iconStroked} = standard
        this.selectedOption = {
          value,
          icon,
          iconStroked,
        }
        this.control?.setValue(value)
      }
    }
    this.cdr.detectChanges()
  }

  public onOptionSelect($event: OptionSelectOutputInterface): void {
    this.selectedOption = $event
    this.control?.setValue($event.value)
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
}
