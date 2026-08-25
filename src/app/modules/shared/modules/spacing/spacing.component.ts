import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'yrx-spacing',
    templateUrl: './spacing.component.html',
    styleUrls: ['./spacing.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SpacingComponent {
  @Input() type: 'XS2' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XL2' | null = null
  @Input() customSpace: number = 0
}
