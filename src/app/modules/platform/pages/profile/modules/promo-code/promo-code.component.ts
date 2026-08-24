import {Component} from '@angular/core';
import {PromoCodeEnum} from "./enums/promo-code.enum";

@Component({
    selector: 'yrx-promo-code',
    templateUrl: './promo-code.component.html',
    styleUrls: ['./promo-code.component.scss'],
    standalone: false
})
export class PromoCodeComponent {

  public readonly PromoCodeEnum = PromoCodeEnum;
  public hide: boolean = false;
  public state: PromoCodeEnum = PromoCodeEnum.DEFAULT

  handlerAccept() {
    this.state = PromoCodeEnum.SUCCESS
  }

  handlerHide() {
    this.hide = true
  }
}
