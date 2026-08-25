import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {
  CommerceAcquisitionOrigin, commerceOriginCopy,
} from '../../interfaces/commerce-acquisition.interface';

@Component({
  selector: 'yrx-commerce-origin',
  templateUrl: './commerce-origin.component.html',
  styleUrls: ['./commerce-origin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CommerceOriginComponent {
  @Input() public origin: CommerceAcquisitionOrigin = 'PLATFORM';

  public get copy(): {label: string; description: string} { return commerceOriginCopy(this.origin); }
  public get modifier(): string { return `origin_${this.origin.toLowerCase()}`; }
}
