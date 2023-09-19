import {Component, Input} from '@angular/core';

@Component({
  selector: 'yrx-donate-panel',
  templateUrl: './donate-panel.component.html',
  styleUrls: ['./donate-panel.component.scss']
})
export class DonatePanelComponent {
  @Input() cost: number = 0
}
