import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {StatisticsListRequestInterface} from '../interfaces/old/statistics-list-request.interface';
import {StatisticsResponseInterface} from '../interfaces/old/statistics-response.interface';
import {PlatformSessionService} from './platform-session.service';

export type StatValueKind = 'BIGINT' | 'NUMERIC' | 'TEXT' | 'BOOL';
export type StatAggregationKind = 'SUM' | 'LAST';

export interface PlatformStatDefinition {
  id: string;
  code: string;
  valueKind: StatValueKind;
  aggregationKind: StatAggregationKind;
  unit?: string;
  allowNegative: boolean;
  active: boolean;
}

export interface PlatformStatDefinitionPage {
  items: PlatformStatDefinition[];
  page: {nextCursor: string | null; hasMore: boolean};
}

export interface CreatePlatformStatDefinition {
  code: string;
  valueKind: StatValueKind;
  aggregationKind: StatAggregationKind;
  unit?: string;
  allowNegative: boolean;
}

@Injectable()
export class StatisticsService {
  constructor(
    private readonly http: HttpClient,
    private readonly session: PlatformSessionService,
  ) {}

  list(): Observable<PlatformStatDefinitionPage> {
    return this.http.get<PlatformStatDefinitionPage>(`${environment.platformApiUrl}/admin/stat-definitions`);
  }

  /** Compatibility projection for existing game selectors while they migrate to contract codes. */
  getStatisticsList(input: StatisticsListRequestInterface): Observable<StatisticsResponseInterface[]> {
    return this.list().pipe(map(page => page.items
      .filter(item => !input.value || item.code.includes(input.value))
      .map(item => this.legacyProjection(item))));
  }

  /** Compatibility projection for existing leaderboard column labels. */
  getStatistics(code: string): Observable<StatisticsResponseInterface> {
    return this.list().pipe(map(page => {
      const definition = page.items.find(item => item.code === code);
      if (!definition) throw new Error(`Statistic contract ${code} is not published`);
      return this.legacyProjection(definition);
    }));
  }

  create(input: CreatePlatformStatDefinition): Observable<PlatformStatDefinition> {
    return this.session.status().pipe(
      switchMap(status => this.http.post<PlatformStatDefinition>(
        `${environment.platformApiUrl}/admin/stat-definitions`, input,
        {headers: {
          'x-csrf-token': status.csrfToken ?? '',
          'idempotency-key': crypto.randomUUID(),
        }}
      ))
    );
  }

  deactivate(statDefinitionId: string, reason: string): Observable<PlatformStatDefinition> {
    return this.session.status().pipe(
      switchMap(status => this.http.post<PlatformStatDefinition>(
        `${environment.platformApiUrl}/admin/stat-definitions/${encodeURIComponent(statDefinitionId)}/deactivate`,
        {reason},
        {headers: {
          'x-csrf-token': status.csrfToken ?? '',
          'idempotency-key': crypto.randomUUID(),
        }}
      ))
    );
  }

  private legacyProjection(definition: PlatformStatDefinition): StatisticsResponseInterface {
    const aggregation = definition.aggregationKind === 'SUM' ? 'сумма значений' : 'последнее значение';
    return {
      key: definition.code,
      title: definition.code,
      description: `${definition.valueKind}, ${aggregation}${definition.unit ? `, единица: ${definition.unit}` : ''}`,
    };
  }
}
