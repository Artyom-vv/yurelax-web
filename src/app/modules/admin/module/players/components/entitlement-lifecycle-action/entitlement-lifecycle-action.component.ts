import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

export type EntitlementLifecycleChange = {operation: 'REVOKE' | 'RESTORE'; reason: string};

@Component({
  selector: 'yrx-entitlement-lifecycle-action',
  templateUrl: './entitlement-lifecycle-action.component.html',
  styleUrls: ['./entitlement-lifecycle-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EntitlementLifecycleActionComponent {
  @Input({required: true}) status = '';
  @Input({required: true}) capabilityName = '';
  @Input() busy = false;
  @Output() changeRequested = new EventEmitter<EntitlementLifecycleChange>();

  public expanded = false;
  public reason = '';

  public get operation(): 'REVOKE' | 'RESTORE' | null {
    if (this.status === 'ACTIVE') return 'REVOKE';
    if (this.status === 'REVOKED') return 'RESTORE';
    return null;
  }

  public open(): void { if (!this.busy && this.operation) this.expanded = true; }
  public cancel(): void { this.expanded = false; this.reason = ''; }

  public submit(): void {
    const reason = this.reason.trim();
    const operation = this.operation;
    if (!operation || reason.length < 3 || reason.length > 500 || this.busy) return;
    this.changeRequested.emit({operation, reason});
    this.cancel();
  }
}
