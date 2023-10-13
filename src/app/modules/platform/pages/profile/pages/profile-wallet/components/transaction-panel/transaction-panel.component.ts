import {AfterViewInit, Component, Input} from '@angular/core';
import {TransitionPanelType} from "./interfaces/transition-panel.interface";

@Component({
  selector: 'yrx-transaction-panel',
  templateUrl: './transaction-panel.component.html',
  styleUrls: ['./transaction-panel.component.scss']
})
export class TransactionPanelComponent implements AfterViewInit {
  @Input() even: boolean = false;
  @Input() amount: number = 0
  @Input() type: TransitionPanelType = 'income'

  public readonly Math = Math;
  public amountPrefix: string = ''

  ngAfterViewInit() {
    this.amountPrefix = this.amount >= 0 ? '+' : '-'
  }
}
