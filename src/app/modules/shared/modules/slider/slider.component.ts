import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, HostListener,
  Input,
  Output,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'yrx-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SliderComponent implements AfterViewInit {
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() thumbSize: number = 1;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;
  @ViewChild('thumb') thumb!: ElementRef<HTMLDivElement>;

  public value: number = 0;
  public isSliding: boolean = false;
  public prevValue: number = 0;
  public thumbTranslateX: string = ''
  public thumbDif: number = 0;

  public paddingLeft: number = 0
  public paddingRight: number = 0

  ngAfterViewInit() {
    this.slider.nativeElement.tabIndex = 0;
    const computedStyle = getComputedStyle(this.slider.nativeElement);
    this.paddingLeft = parseFloat(computedStyle.paddingLeft);
    this.paddingRight = parseFloat(computedStyle.paddingRight);
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: MouseEvent | TouchEvent): void {
    this.isSliding = true
    this.prevValue = this.value;

    let clientX: number;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as MouseEvent).clientX;
    }

    const thumbRect = this.thumb.nativeElement.getBoundingClientRect()
    this.thumbDif = clientX - thumbRect.left
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: MouseEvent | TouchEvent): void {
    if (this.isSliding) {
      const rect = this.slider.nativeElement.getBoundingClientRect();
      const thumbRect = this.thumb.nativeElement.getBoundingClientRect()
      let clientX: number;

      if ('touches' in event) {
        clientX = event.touches[0].clientX;
      } else {
        clientX = (event as MouseEvent).clientX;
      }

      const thumbWidth = this.thumb.nativeElement.offsetWidth;
      const width = rect.right - rect.left - this.paddingLeft - this.paddingRight - thumbWidth;  // Учитываем оба паддинга и ширину "thumb"

      const thumbWidthPercent = (thumbWidth / rect.width) * 100;
      const adjustedWidth = rect.width * (1 - thumbWidthPercent / 100);
      const x = clientX - rect.left - this.paddingLeft - this.thumbDif;
      let newValue = (x / adjustedWidth) * (this.max - this.min) + this.min;
      newValue = Math.min(Math.max(newValue, this.min), this.max);

      if (newValue !== this.value) {
        this.value = newValue;
        this.change.emit(this.value);
      }

      this.value = Math.min(Math.max(newValue, this.min), this.max);
      this.thumbTranslateX = `translateX(${ Math.min(Math.max(x, 0), width) }px)`;
    }
  }


  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onTouchEnd(): void {
    this.isSliding = false;
  }


  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    let step = (this.max - this.min) / 100; // или любой другой шаг, который тебе подходит
    if (event.key === 'ArrowRight') {
      this.value = Math.min(this.value + step, this.max);
      this.change.emit(this.value);
    } else if (event.key === 'ArrowLeft') {
      this.value = Math.max(this.value - step, this.min);
      this.change.emit(this.value);
    }
  }
}
