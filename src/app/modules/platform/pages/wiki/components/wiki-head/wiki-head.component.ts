import { Component, Input } from '@angular/core';

@Component({
    selector: 'yrx-wiki-head',
    templateUrl: './wiki-head.component.html',
    styleUrls: ['./wiki-head.component.scss'],
    standalone: false
})
export class WikiHeadComponent {
  @Input() title: string = ''
  @Input() icon: string = ''
}
