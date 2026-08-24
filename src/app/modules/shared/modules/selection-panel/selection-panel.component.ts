import {Component, OnInit, Input} from '@angular/core';

@Component({
    host: {
        "class": "flex_grow"
    },
    selector: 'yrx-selection-panel',
    templateUrl: './selection-panel.component.html',
    styleUrls: ['./selection-panel.component.scss'],
    standalone: false
})
export class SelectionPanelComponent implements OnInit {

  @Input() icon: string = ''
  @Input() reverse: boolean = false
  @Input() navIcon: string = 'chevron-right'

  constructor() {
  }

  ngOnInit() {
  }
}
