import {ElementRef, Injectable} from "@angular/core";
import {ChildrenOutletContexts, RouterOutlet} from "@angular/router";
import {animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style} from "@angular/animations";

@Injectable()
export class AnimationsService {
  constructor(
    private contexts: ChildrenOutletContexts,
    private builder: AnimationBuilder
  ) {
  }

  public getRouteAnimationData(outlet: RouterOutlet | null, b = true): string | null {
    let value: string | null = outlet?.activatedRouteData['route']
    if (!b) value = this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    return value || 'appearance';
  }

  public playAnimation(animation: AnimationMetadata | AnimationMetadata[], element: HTMLElement): any {
    const player: AnimationPlayer = this.builder.build(animation).create(element);
    player.play()
    return player
  }

  public slideAnimation(duration: number, element: ElementRef, y: number = -15) {
    this.playAnimation([
      style({
        opacity: 0,
        transform: `translateY(${y}px)`
      }),
      animate(duration + 'ms ease-out', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
    ], element.nativeElement)
  }

  public deleteAnimation(duration: number, element: ElementRef) {
    this.playAnimation([
      style({
        opacity: 1
      }),
      animate(duration + 'ms ease-in-out', style({
        opacity: 0,
        zIndex: 1,
        position: 'relative',
        marginTop: '-' + element.nativeElement.getBoundingClientRect().height + 'px',
      })),
    ], element.nativeElement)
  }
}
