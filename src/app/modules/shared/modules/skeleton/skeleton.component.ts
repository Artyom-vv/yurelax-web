import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Properties} from "csstype";

@Component({
    selector: 'yrx-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SkeletonComponent {
  @Input() styles: Properties = {};
  @Input() theme: 'light' | 'dark' | 'white' | 'bright' = 'light';
}
