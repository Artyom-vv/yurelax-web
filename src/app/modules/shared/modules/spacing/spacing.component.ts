import {Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-spacing',
  templateUrl: './spacing.component.html',
  styleUrls: ['./spacing.component.scss']
})
export class SpacingComponent {
  @Input() type: '2XS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | null = null
  @Input() customSpace: number = 0
}
