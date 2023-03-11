import {Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() styles: any = {};
  @Input() theme: 'light' | 'dark' | 'white' = 'light';
}
