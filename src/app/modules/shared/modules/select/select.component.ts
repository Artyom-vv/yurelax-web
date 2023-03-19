import {
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
export class SelectComponent {

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

  public selectedOption: OptionSelectOutputInterface | null = null;
  public isAbove: boolean = false;

  public onOptionSelect($event: OptionSelectOutputInterface): void {
    this.selectedOption = $event
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
