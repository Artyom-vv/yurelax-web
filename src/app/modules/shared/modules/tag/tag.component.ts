import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {ITagResponse} from "./interfaces/tag.interface";

@Component({
    selector: 'yrx-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TagComponent implements AfterViewInit {

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  @Input() defaultSelect: boolean = false;
  @Input() value: any
  @Input() disabled: boolean = false;
  @Output() onSelect: EventEmitter<ITagResponse<any>> = new EventEmitter<ITagResponse<any>>()

  public selected: boolean = false;

  ngAfterViewInit() {
    this.selected = this.defaultSelect;
    this.cdr.detectChanges()
  }

  public onClick() {
    this.selected = !this.selected
    this.onSelect.emit({
      value: this.value,
      selected: this.selected
    })
  }
}
