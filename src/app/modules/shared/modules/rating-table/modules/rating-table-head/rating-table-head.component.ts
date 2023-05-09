import {Component, Input} from '@angular/core';
import {IRatingTableColumn} from "../../interfaces/rating-table.interface";

@Component({
  selector: 'yrx-rating-table-head',
  templateUrl: './rating-table-head.component.html',
  styleUrls: ['./rating-table-head.component.scss']
})
export class RatingTableHeadComponent {
  @Input() filteredByKey!: string | undefined
  @Input() columns: IRatingTableColumn[] = []
}
