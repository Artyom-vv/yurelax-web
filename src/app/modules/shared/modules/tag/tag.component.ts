import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITagResponse} from "./interfaces/tag.interface";

@Component({
  selector: 'yrx-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  constructor() {
  }

  @Input() value: any
  @Input() disabled: boolean = false;
  @Output() onSelect: EventEmitter<ITagResponse<any>> = new EventEmitter<ITagResponse<any>>()

  public selected: boolean = false;

  public onClick() {
    this.selected = !this.selected
    this.onSelect.emit({
      value: this.value,
      selected: this.selected
    })
  }
}
