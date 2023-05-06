import {Component, Input} from '@angular/core';
import {RatingTableInterface} from "./interfaces/rating-table.interface";
import {ToolsService} from "../../services/tools.service";

@Component({
  selector: 'yrx-rating-table',
  templateUrl: './rating-table.component.html',
  styleUrls: ['./rating-table.component.scss']
})
export class RatingTableComponent {
  @Input() data: RatingTableInterface[] = []
  @Input() columns: string[] = []
}
