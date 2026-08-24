import {Component, Input} from '@angular/core';
import {IRatingTableColumn, RatingTableInterface} from "./interfaces/rating-table.interface";
import {ToolsService} from "../../services/tools.service";

@Component({
    selector: 'yrx-rating-table',
    templateUrl: './rating-table.component.html',
    styleUrls: ['./rating-table.component.scss'],
    standalone: false
})
export class RatingTableComponent {
  @Input() data!: RatingTableInterface;
  @Input() columns: IRatingTableColumn[] = []
}
