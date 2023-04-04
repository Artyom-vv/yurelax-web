import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, DoCheck,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'yrx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit, DoCheck {
  constructor(private cdr: ChangeDetectorRef) {
  }

  @Input() size: 'big' | 'normal' | 'small' = 'normal';
  @Input() type: 'primary' | 'secondary' = 'primary'
  @Input() custom: string = ''
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
