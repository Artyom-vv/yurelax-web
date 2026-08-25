import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {FootPanelType} from "./interfaces/foot-panel.interface";

@Component({
    selector: 'yrx-foot-panel',
    templateUrl: './foot-panel.component.html',
    styleUrls: ['./foot-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FootPanelComponent {
  @Input() type: FootPanelType = 'back'
  @Input() title: string = ''
}
