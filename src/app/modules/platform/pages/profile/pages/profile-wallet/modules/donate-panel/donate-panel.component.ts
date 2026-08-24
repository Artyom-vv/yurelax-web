import {AfterViewInit, ChangeDetectorRef, Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {DonatePanelType} from "./interfaces/donate-panel.interface";

@Component({
    selector: 'yrx-donate-panel',
    templateUrl: './donate-panel.component.html',
    styleUrls: ['./donate-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DonatePanelComponent implements AfterViewInit {
  @Input() coins: number = 0
  @Input() oldCoins?: number
  @Input() cost: number = 0
  @Input() type: DonatePanelType = 'secondary'

  public discount?: number

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    if (this.oldCoins) {
      this.discount = +(this.coins / this.oldCoins * 100 - 100).toFixed(0)
      this.cdr.detectChanges()
    }
  }
}
