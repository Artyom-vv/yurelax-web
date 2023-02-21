import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'yrx-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent {
  @Input() icon: string = ''
  @Input() fill: string = ''
  @Input() color: string = ''
  @Input() stroked: boolean = false;
  @Input() hover: boolean = true
}
