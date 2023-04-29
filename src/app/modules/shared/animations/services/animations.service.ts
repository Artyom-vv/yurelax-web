import {Injectable} from "@angular/core";
import {ChildrenOutletContexts, RouterOutlet} from "@angular/router";
import {AnimationBuilder, AnimationMetadata, AnimationPlayer} from "@angular/animations";

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
}
