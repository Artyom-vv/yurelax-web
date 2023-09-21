import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {RefIconService} from "./services/ref-icon.service";

@Component({
  selector: 'yrx-ref-icon',
  templateUrl: './ref-icon.component.html',
  styleUrls: ['./ref-icon.component.scss']
})
export class RefIconComponent implements OnInit {
  @Input() name: string = '';
  svg!: SafeHtml;

  constructor(
    private iconRegistry: RefIconService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const svg = this.iconRegistry.getIcon(this.name);
    this.svg = this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
