import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {PlatformSessionService} from './platform-session.service';
export type QuarantineStatus='OPEN'|'REPLAY_PENDING'|'REPLAYED'|'REJECTED';
export interface QuarantinedEvent {id:string;subject:string;reasonCode:string;payload:Record<string,unknown>;payloadHash:string;occurredAt:string;quarantinedAt:string;status:QuarantineStatus;resolutionNote?:string;resolvedBy?:string}
export interface QuarantinePage {items:QuarantinedEvent[];page:{nextCursor:string|null;hasMore:boolean}}
@Injectable()
export class AdminQuarantineService {
  constructor(private readonly http:HttpClient,private readonly session:PlatformSessionService){}
  list(status?:QuarantineStatus,reasonCode?:string):Observable<QuarantinePage>{let params=new HttpParams().set('limit','50');if(status)params=params.set('status',status);if(reasonCode)params=params.set('reasonCode',reasonCode);return this.http.get<QuarantinePage>(`${environment.platformApiUrl}/admin/quarantined-events`,{params})}
  reject(id:string,note:string){return this.mutation(`/admin/quarantined-events/${encodeURIComponent(id)}/reject`,{note})}
  replay(id:string,note:string){return this.mutation(`/admin/quarantined-events/${encodeURIComponent(id)}/replay`,{note})}
  private mutation(path:string,body:unknown){return this.session.status().pipe(switchMap(status=>this.http.post<QuarantinedEvent>(`${environment.platformApiUrl}${path}`,body,{headers:{'x-csrf-token':status.csrfToken??'','idempotency-key':crypto.randomUUID()}})))}
}
