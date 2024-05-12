import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'yrx-error-hint-field',
  templateUrl: './error-hint-field.component.html',
  styleUrls: ['./error-hint-field.component.scss'],
})
export class ErrorHintFieldComponent {
  @Input() field: string | string[] = '';
  @ViewChild('text') text!: ElementRef
}
