import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'yrx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {
  }

  @Input() size: 'big' | 'normal' | 'small' = 'normal';
  @Input() type: 'primary' | 'secondary' = 'primary'
  @Input() custom: string = ''
  @Input() disabled: boolean = false
  @Output() press: EventEmitter<any> = new EventEmitter<any>()


  ngAfterViewInit() {
    this.cdr.detectChanges()
  }
}
