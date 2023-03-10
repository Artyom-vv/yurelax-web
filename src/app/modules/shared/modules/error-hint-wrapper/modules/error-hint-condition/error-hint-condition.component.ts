import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'yrx-error-hint-condition',
  templateUrl: './error-hint-condition.component.html',
  styleUrls: ['./error-hint-condition.component.scss'],
})
export class ErrorHintConditionComponent {
  @Input() condition: string[] = [];
  @ViewChild('text') text!: ElementRef
}
