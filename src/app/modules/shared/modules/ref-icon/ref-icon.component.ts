import {
  booleanAttribute,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { RefIconService } from "./services/ref-icon.service";

@Component({
    selector: 'yrx-ref-icon',
    templateUrl: './ref-icon.component.html',
    styleUrls: ['./ref-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RefIconComponent implements OnChanges {

  @HostBinding('class.stroke')
  @Input({transform: booleanAttribute}) stroke: boolean = true;
  @Input() name: string = '';
  @Input() strokeSize?: number;
  @ViewChild('icon', { static: false }) icon!: ElementRef<HTMLDivElement>;

  public svg!: SafeHtml;
  public styles: { [key: string]: string } = {};

  constructor(
    private iconRegistry: RefIconService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name']) {
      this.updateIcon();
    }
  }

  private updateIcon() {
    const svg = this.iconRegistry.getIcon(this.name);
    this.svg = this.sanitizer.bypassSecurityTrustHtml(svg);
    this.updateStrokeWidth();
  }

  ngAfterViewInit() {
    this.updateStrokeWidth();
  }

  private updateStrokeWidth() {
    if (this.icon) {
      const svg = this.icon.nativeElement.querySelector('svg');
      const paths = this.icon.nativeElement.querySelectorAll('path');
      if (svg && this.strokeSize) {
        paths.forEach(path => {
          this.renderer.setStyle(path, 'stroke-width', `${this.strokeSize}px`);
        });
      }
    }
  }
}
