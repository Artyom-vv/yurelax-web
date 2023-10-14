import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {RefIconService} from "./services/ref-icon.service";

@Component({
  selector: 'yrx-ref-icon',
  templateUrl: './ref-icon.component.html',
  styleUrls: ['./ref-icon.component.scss']
})
export class RefIconComponent implements OnInit, AfterViewInit {

  @Input() name: string = '';
  @Input() strokeSize?: number;
  @ViewChild('icon') icon!: ElementRef<HTMLDivElement>

  public svg!: SafeHtml;
  public styles: {
    [key: string]: string
  } = {};

  constructor(
    private iconRegistry: RefIconService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    const svg = this.iconRegistry.getIcon(this.name);
    this.svg = this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  ngAfterViewInit() {
    const svg = this.icon.nativeElement.querySelector('svg');
    const paths = this.icon.nativeElement.querySelectorAll('path');

    if (svg && this.strokeSize) {
      paths.forEach(path => {
        this.renderer.setStyle(path, 'stroke-width', `${this.strokeSize}px`);
      });
    }
  }

}
