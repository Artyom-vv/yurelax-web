import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'yrx-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LinkComponent {
  @Input() underlined: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() iconReverse: boolean  = false;
  @Input() size: 'big' | 'normal' | 'small' = 'normal';
  @Input() weight: 'regular' | 'medium' = 'medium';
  @Input() iconStroked: boolean = false;
  @Input() iconSize: number = 0;
  @Input() custom: 'purple-300' | '' = '';
  @Input() hover: boolean = true;
  @Output() press: EventEmitter<any> = new EventEmitter();
  public _hover: boolean = false;

  public onClick($event: MouseEvent) {
    if (!this.disabled) this.press.emit($event)
  }
}
