import { Component } from '@angular/core';
import {DonateModalService} from "./services/donate-modal.service";

@Component({
    selector: 'yrx-donate-modal',
    templateUrl: './donate-modal.component.html',
    styleUrls: ['./donate-modal.component.scss'],
    standalone: false
})
export class DonateModalComponent {

  constructor(
    private donateModalService: DonateModalService
  ) {
  }

  transactionsRedirect() {
    this.donateModalService.close()
  }
}
