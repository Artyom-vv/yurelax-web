import {Component, Input} from '@angular/core';

@Component({
    selector: 'yrx-table-section',
    templateUrl: './table-section.component.html',
    styleUrls: ['./table-section.component.scss'],
    standalone: false
})
export class TableSectionComponent {
  @Input() class: string = '';
  @Input() even: boolean = false
}
