import {AfterViewInit, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'yrx-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent implements AfterViewInit {
  @Input() icon: string = ''
  @Input() width: number = 0;
  @Input() height: number = 0;
  @Input() fill: string = ''
  @Input() color: string = ''
  @Input() stroked: boolean = false;
  @Input() path: boolean = false;
  @Input() hover: boolean = true

  styles: any = {
    fill: this.fill,
  }

  ngAfterViewInit() {
    if (!!(this.width && this.height)) this.styles = {
      ...this.styles,
      minHeight: this.height,
      maxHeight: this.height,
      height: this.height,
      minWidth: this.width,
      maxWidth: this.width,
      width: this.width,
    }
  }
}
