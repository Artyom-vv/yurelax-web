import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ElementRef, Injectable} from '@angular/core';
import {SelectBlockerComponent} from "../components/select-blocker/select-blocker.component";

@Injectable()
export class SelectService {
  private overlayRef!: OverlayRef;
  private blockerRef!: ElementRef;

  constructor(
    private overlay: Overlay,
  ) {
  }

  openBlocker(element: ElementRef): OverlayRef {
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'selected-pane-overlay',
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(element)
        .withLockedPosition()
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 8
          }
        ]),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    this.blockerRef = element;
    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(new ComponentPortal(SelectBlockerComponent));
    return this.overlayRef
  }

  closeBlocker() {
    if (this.overlayRef && this.blockerRef) {
      this.overlayRef.dispose();
      this.blockerRef.nativeElement.blur();
    }
  }
}
