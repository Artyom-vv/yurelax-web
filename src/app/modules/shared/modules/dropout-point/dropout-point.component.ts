import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {RouterLinkActive} from "@angular/router";

@Component({
  selector: 'yrx-dropout-point',
  templateUrl: './dropout-point.component.html',
  styleUrls: ['./dropout-point.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropoutPointComponent {
  @Input() size: 'big' | 'normal' | 'small' = 'normal'
  @Input() icon: string = ''
  @Input() iconStroked: boolean = false
  @Input() underlined: boolean = true
  @Input() rla!: RouterLinkActive
  @Output() press: EventEmitter<any> = new EventEmitter<any>()
}
