import {Directive, Input, OnDestroy, OnInit, ElementRef, HostBinding} from '@angular/core';
import {AnimationBuilder, style, animate} from '@angular/animations';

@Directive({
    selector: '[yrxAnimateOpacity]',
    standalone: false
})
export class AnimationOpacityDirective implements OnInit, OnDestroy {

  @Input() duration: number = 1;
  @Input() always: boolean = false;

  @HostBinding('style') get base() {
    return {
      opacity: 0
    }
  }

  private observer: IntersectionObserver;
  private hasAnimated: boolean = false;

  constructor(private el: ElementRef, private builder: AnimationBuilder) {
    const config = {
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && (this.always || !this.hasAnimated)) {
          this.startAnimation();
          this.hasAnimated = true;
        }
      });
    }, config);
  }

  ngOnInit(): void {
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private startAnimation() {
    const metadata = [
      style({opacity: 0}),
      animate(`${this.duration}s ease`, style({opacity: 1}))
    ];

    const factory = this.builder.build(metadata);
    const player = factory.create(this.el.nativeElement);

    player.play();
  }
}
