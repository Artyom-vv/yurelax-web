import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'yrx-table-section',
    templateUrl: './table-section.component.html',
    styleUrls: ['./table-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TableSectionComponent {
  @Input() class: string = '';
  @Input() even: boolean = false
}
