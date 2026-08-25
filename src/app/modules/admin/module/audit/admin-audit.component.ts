import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {catchError, finalize, of, tap} from 'rxjs';
import {AdminAuditService, AuditEntry} from '../../../shared/services/admin-audit.service';

@Component({
  selector: 'yrx-admin-audit',
  templateUrl: './admin-audit.component.html',
  styleUrls: ['./admin-audit.component.scss'],
  standalone: false,
})
export class AdminAuditComponent implements OnInit {
  items: AuditEntry[] = [];
  loading = true;
  action = '';
  resourceType = '';
  resourceId = '';
  actorId = '';
  correlationId = '';
  nextCursor: string | null = null;

  constructor(
    private readonly api: AdminAuditService,
    private readonly changes: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(cursor?: string): void {
    this.loading = true;
    this.api.list({
      action: this.action.trim() || undefined,
      resourceType: this.resourceType.trim() || undefined,
      resourceId: this.resourceId.trim() || undefined,
      actorId: this.actorId.trim() || undefined,
      correlationId: this.correlationId.trim() || undefined,
      cursor,
    }).pipe(
      tap(page => {
        this.items = cursor ? [...this.items, ...page.items] : page.items;
        this.nextCursor = page.page.nextCursor;
      }),
      catchError(() => {
        if (!cursor) this.items = [];
        return of(null);
      }),
      finalize(() => {
        this.loading = false;
        this.changes.markForCheck();
      }),
    ).subscribe();
  }

  reset(): void {
    this.action = '';
    this.resourceType = '';
    this.resourceId = '';
    this.actorId = '';
    this.correlationId = '';
    this.load();
  }
}
