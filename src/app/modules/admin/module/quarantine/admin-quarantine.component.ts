import {Component,OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError,finalize,of,tap} from 'rxjs';
import {AdminQuarantineService,QuarantinedEvent,QuarantineStatus} from '../../../shared/services/admin-quarantine.service';
@Component({selector:'yrx-admin-quarantine',templateUrl:'./admin-quarantine.component.html',styleUrls:['./admin-quarantine.component.scss'],standalone:false})
export class AdminQuarantineComponent implements OnInit {
  items:QuarantinedEvent[]=[];status:QuarantineStatus='OPEN';reasonCode='';loading=true;decidingId:string|null=null;decision:'reject'|'replay'|null=null;note='';
  constructor(private readonly api:AdminQuarantineService,private readonly snackbar:MatSnackBar){}
  ngOnInit(){this.load()}
  load(){this.loading=true;this.api.list(this.status,this.reasonCode.trim()||undefined).pipe(tap(page=>this.items=page.items),catchError(error=>this.failure(error,'Не удалось загрузить карантин')),finalize(()=>this.loading=false)).subscribe()}
  filterStatus(value:string){this.status=value as QuarantineStatus;this.load()}
  begin(id:string,decision:'reject'|'replay'){this.decidingId=id;this.decision=decision;this.note=''}
  cancel(){this.decidingId=null;this.decision=null;this.note=''}
  decide(item:QuarantinedEvent){if(!this.decision||this.note.trim().length<3)return;const action=this.decision==='replay'?this.api.replay(item.id,this.note.trim()):this.api.reject(item.id,this.note.trim());action.pipe(tap(()=>{this.snackbar.open(this.decision==='replay'?'Событие поставлено на повторную обработку':'Событие закрыто без повтора','Закрыть',{duration:4000});this.cancel();this.load()}),catchError(error=>this.failure(error,'Не удалось сохранить решение'))).subscribe()}
  replayable(item:QuarantinedEvent){return item.reasonCode==='EVENT_TOO_OLD'}
  private failure(error:any,fallback:string){this.snackbar.open(error?.error?.message??fallback,'Закрыть',{duration:6000});return of(null)}
}
