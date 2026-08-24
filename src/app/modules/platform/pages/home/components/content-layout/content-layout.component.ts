import {Component, Input} from '@angular/core';
import {ContentLayoutImgInterface} from "./interfaces/content-layout-img.interface";

@Component({
    selector: 'yrx-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss'],
    standalone: false
})
export class ContentLayoutComponent {
  @Input() img: ContentLayoutImgInterface = {} as ContentLayoutImgInterface
  @Input() reversed: boolean = false;
}
