import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'yrx-wiki-head',
    templateUrl: './wiki-head.component.html',
    styleUrls: ['./wiki-head.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class WikiHeadComponent {
  @Input() title: string = ''
  @Input() icon: string = ''
}
