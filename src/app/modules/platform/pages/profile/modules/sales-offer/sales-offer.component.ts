import {Component} from '@angular/core';
import {DonateModalService} from "../../pages/profile-wallet/modules/donate-modal/services/donate-modal.service";

@Component({
    selector: 'yrx-sales-offer',
    templateUrl: './sales-offer.component.html',
    styleUrls: ['./sales-offer.component.scss'],
    standalone: false
})
export class SalesOfferComponent {

  constructor(
    private donateModalService: DonateModalService
  ) {
  }

  openModal() {
    this.donateModalService.open()
  }
}
