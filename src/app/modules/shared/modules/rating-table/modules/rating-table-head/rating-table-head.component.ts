import {Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-rating-table-head',
  templateUrl: './rating-table-head.component.html',
  styleUrls: ['./rating-table-head.component.scss']
})
export class RatingTableHeadComponent {
  @Input() columns: string[] = []
}
