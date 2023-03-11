import {Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],

})
export class LinkComponent {
  @Input() underlined: boolean = false;
  @Input() icon: string = '';
  @Input() iconReverse: boolean  = false;
  @Input() size: 'big' | 'normal' | 'small' = 'normal';
  @Input() weight: 'regular' | 'medium' = 'medium';
  @Input() iconStroked: boolean = false;
  @Input() custom: 'purple-300' | '' = '';
  @Input() hover: boolean = true;
  public _hover: boolean = false;
}
