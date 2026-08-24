import {AfterViewInit, Component, ElementRef, Input, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'yrx-error-hint-field',
    templateUrl: './error-hint-field.component.html',
    styleUrls: ['./error-hint-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ErrorHintFieldComponent implements AfterViewInit {
  @Input() field: string | string[] = '';
  @ViewChild('text') private text!: ElementRef<HTMLDivElement>

  text$ = new BehaviorSubject<string>('')

  ngAfterViewInit() {
    this.text$.next(this.text.nativeElement.innerText)
  }
}
