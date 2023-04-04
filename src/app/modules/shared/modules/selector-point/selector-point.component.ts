import {AfterViewInit, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'yrx-selector-point',
  templateUrl: './selector-point.component.html',
  styleUrls: ['./selector-point.component.scss']
})
export class SelectorPointComponent implements AfterViewInit, DoCheck {
  constructor(private cdr: ChangeDetectorRef) {
  }

  @Input() active: boolean = false
  @Input() iconLoading: boolean | null = null
  @Input() disabled: boolean = false
  @Output() press: EventEmitter<any> = new EventEmitter<any>()


  ngAfterViewInit() {
    this.cdr.detectChanges()
  }

  ngDoCheck() {
    this.cdr.detectChanges()
  }
}
