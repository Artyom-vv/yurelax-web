import {Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
    selector: '[yrxInView]',
    standalone: false
})
export class InViewDirective implements OnInit, OnDestroy {

  @Output() onEntry: EventEmitter<boolean> = new EventEmitter();

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    const config = {
      rootMargin: '0px',
      threshold: 0.1 // можно изменить, это процент видимости элемента
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.onEntry.emit(true);
        } else {
          this.onEntry.emit(false);
        }
      });
    }, config);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
