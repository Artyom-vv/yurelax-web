import {
  AfterViewInit, ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter, HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output, QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputEmitInterface} from "./directives/input-event/interfaces/input-emit.interface";
import {PersistenceService} from "../../../shared/services/persistence.service";
import {BehaviorSubject, interval, map, Observable, Subscription, switchMap, tap} from "rxjs";

@Component({
  selector: 'yrx-email-code-verification',
  templateUrl: './email-code-verification.component.html',
  styleUrls: ['./email-code-verification.component.scss'],
})
export class EmailCodeVerificationComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private persistenceService: PersistenceService
  ) {
  }

  @Input() text: string = ''
  @Input() dataLoading: boolean = false
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>()
  @Output() resend: EventEmitter<any> = new EventEmitter<any>()
  @ViewChildren('inputRefs') inputRefs!: QueryList<ElementRef>

  public form!: FormGroup
  public inputs: number[] = Array.from(Array(6).keys())
  public viewMounted: boolean = false;
  public delayDate$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public delay: number = 0;
  public SECONDS: number = 60

  ngOnInit() {
    this.initForms()

    const delayDate = this.persistenceService.get('emailCodeDelay')
    if (delayDate && +delayDate > new Date().getTime()) {
      this.setDelay(delayDate)
    }

    this.delayDate$.pipe(
      tap((value) => {
        this.persistenceService.set('emailCodeDelay', value)
        this.updateDelay(value)
      }),
      switchMap((value) => interval(1000).pipe(map(() => value))),
      tap((value) => {
        this.updateDelay(value)
      })
    ).subscribe()
  }

  ngAfterViewInit() {
    this.viewMounted = true;
    this.inputRefs.get(0)?.nativeElement.focus()
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
  }

  public updateDelay(value: number) {
    const remains = value - new Date().getTime();
    if (remains >= -1000) {
      this.delay = Math.ceil(remains / 1000)
    }
  }

  public setDelay(date: number): void {
    this.delayDate$.next(date)
  }

  public onInput(event: InputEmitInterface) {
    let input: ElementRef | undefined;
    if (event.action === 'next') {
      input = this.inputRefs.find(input => +input.nativeElement.id === event.id + 1);
    } else if (event.action === 'back') {
      input = this.inputRefs.find(input => +input.nativeElement.id === event.id - 1);
    }
    if (input) input.nativeElement.focus()
  }

  public onConfirm(): void {
    const code: number = +Object.values(this.form.getRawValue()).join('');
    this.confirm.emit(code)
  }

  public onResend(): void {
    this.resend.emit()
    this.setDelay(new Date().getTime() + this.SECONDS * 1000)
  }

  private initForms(): void {
    this.form = this.fb.group({
      value1: [null, [Validators.required, Validators.maxLength(1)]],
      value2: [null, [Validators.required, Validators.maxLength(1)]],
      value3: [null, [Validators.required, Validators.maxLength(1)]],
      value4: [null, [Validators.required, Validators.maxLength(1)]],
      value5: [null, [Validators.required, Validators.maxLength(1)]],
      value6: [null, [Validators.required, Validators.maxLength(1)]],
    })
  }
}
