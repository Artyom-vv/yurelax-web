import {Component, OnInit, Input} from '@angular/core';

@Component({
  host: {
    "class": "flex_grow"
  },
  selector: 'yrx-selection-panel',
  templateUrl: './selection-panel.component.html',
  styleUrls: ['./selection-panel.component.scss']
})
export class SelectionPanelComponent implements OnInit {

@Input() icon: string = ''

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
