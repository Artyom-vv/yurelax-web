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

@Component({
  selector: 'yrx-email-code-verification',
  templateUrl: './email-code-verification.component.html',
  styleUrls: ['./email-code-verification.component.scss'],
})
export class EmailCodeVerificationComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  @Input() headline: string = ''
  @Input() dataLoading: boolean = false
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>()
  @Output() resend: EventEmitter<any> = new EventEmitter<any>()
  @ViewChildren('inputRefs') inputRefs!: QueryList<ElementRef>

  public form!: FormGroup
  public inputs: number[] = Array.from(Array(6).keys())
  public viewMounted: boolean = false;

  ngOnInit() {
    this.initForms()
  }

  ngAfterViewInit() {
    this.viewMounted = true;
    this.inputRefs.get(0)?.nativeElement.focus()
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
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
    this.confirm.emit()
  }
  public onResend(): void {
    this.resend.emit()
  }

  private initForms(): void {
    this.form = this.fb.group({
      value1: [null, [Validators.required, Validators.maxLength(1)]],
      value2: [null, [Validators.required, Validators.maxLength(1)]],
      value3: [null, [Validators.required, Validators.maxLength(1)]],
      value4: [null, [Validators.required, Validators.maxLength(1)]],
      value5: [null, [Validators.required, Validators.maxLength(1)]],
      value6: [null, [Validators.required, Validators.maxLength(1)]]
    })
  }
}
