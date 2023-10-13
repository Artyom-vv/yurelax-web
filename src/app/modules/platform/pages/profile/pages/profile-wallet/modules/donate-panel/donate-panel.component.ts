import {AfterViewInit, Component, Input} from '@angular/core';
import {DonatePanelType} from "./interfaces/donate-panel.interface";

@Component({
  selector: 'yrx-donate-panel',
  templateUrl: './donate-panel.component.html',
  styleUrls: ['./donate-panel.component.scss']
})
export class DonatePanelComponent implements AfterViewInit {
  @Input() coins: number = 0
  @Input() oldCoins?: number
  @Input() cost: number = 0
  @Input() type: DonatePanelType = 'secondary'

  public discount?: number

  ngAfterViewInit() {
    if (this.oldCoins) {
      this.discount = +(this.coins / this.oldCoins * 100 - 100).toFixed(0)
    }
  }
}
