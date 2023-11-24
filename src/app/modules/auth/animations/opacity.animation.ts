import {animate, style, transition, trigger} from "@angular/animations";

export const OpacityAnimation = trigger('fadeAnimation', [
  transition('false => true', [
    style({
      opacity: 1
    }),
    animate('600ms ease', style({
      opacity: 0
    })),
  ])
])
