import {Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() icon: string = ''
  @Input() fill: string = ''
  @Input() color: string = ''
  @Input() hover: boolean = true
}
