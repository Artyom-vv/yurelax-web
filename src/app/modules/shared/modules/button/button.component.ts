import {Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent{
  @Input() size: 'big' | 'normal' | 'small' = 'normal';
  @Input() type: 'primary' | 'secondary' = 'primary'
  @Input() custom: string = ''
}
