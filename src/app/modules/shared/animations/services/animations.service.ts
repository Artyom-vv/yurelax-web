import {Injectable} from "@angular/core";
import {ChildrenOutletContexts, RouterOutlet} from "@angular/router";

@Injectable()
export class AnimationsService {
  constructor(
    private contexts: ChildrenOutletContexts
  ) {
  }

  getRouteAnimationData(outlet: RouterOutlet | null, b = true): string | null {
    let value: string | null = outlet?.activatedRouteData['route']
    if (!b) value = this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    return value || 'appearance';
  }
}
