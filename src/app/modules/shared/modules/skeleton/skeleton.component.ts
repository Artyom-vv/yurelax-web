import {Component, Input} from '@angular/core';
import {Properties} from "csstype";

@Component({
  selector: 'yrx-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() styles: Properties = {};
  @Input() theme: 'light' | 'dark' | 'white' | 'bright' = 'light';
}
