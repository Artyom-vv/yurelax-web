import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

export const AppearanceAnimation = trigger('routeAnimations', [
  transition('* => appearance', [
    style({
      opacity: 0
    }),
    group([
      animate('500ms ease', style({
        opacity: 1
      })),
      query('@*', animateChild(), {optional: true}),
    ])
  ]),
]);

export const SwipeAnimation = trigger('authRouteAnimations', [
  transition('void => *', [
    query(':enter', [
      style({
        opacity: 0
      }),
      animate('600ms 100ms ease')
    ])
  ]),
  transition('* => *', [
    query(':enter, :leave', style({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 368
    }), {optional: true}),
    group([
      query(':enter', [
        style({
          right: '-100%',
          opacity: 0,
        }),
        animate('600ms ease', style({
          opacity: 1,
          right: 0
        }))
      ], {optional: true}),
      query(':leave', [
        style({
          opacity: 1,
          right: 0,
        }),
        animate('400ms ease', style({
          opacity: 0,
          right: '100%'
        }))
      ], {optional: true}),
    ])
  ]),
])
