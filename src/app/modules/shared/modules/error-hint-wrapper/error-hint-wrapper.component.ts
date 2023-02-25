import {
  Component,
  ContentChildren,
  Input, OnDestroy, OnInit,
  QueryList,
} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";
import {ErrorHintConditionComponent} from "../error-hint-condition/error-hint-condition.component";
import {debounceTime, Subscription, tap} from "rxjs";

@Component({
  host: {
    "[style.display]": "isYandexCringe ? display : control?.invalid ? 'block' : 'none'"
  },
  selector: 'yrx-error-hint-wrapper',
  templateUrl: './error-hint-wrapper.component.html',
  styleUrls: ['./error-hint-wrapper.component.scss'],
})
export class ErrorHintWrapperComponent implements OnInit, OnDestroy {
  @Input() control: AbstractControl | null = null;
  @Input() isYandexCringe: boolean = false;
  @ContentChildren(ErrorHintConditionComponent) hints!: QueryList<ErrorHintConditionComponent>;

  private subscriptions: Subscription[] = []

  public checkCondition = (condition: string[]): boolean => !!(condition.some(value => this.control?.errors?.[value]) && this.control?.touched)
  public display: string = 'none'

  ngOnInit() {
    if (this.isYandexCringe) {
      this.subscriptions.push(
        this.control?.valueChanges.pipe(
          debounceTime(50),
          tap(() => {
            this.display = this.control?.invalid ? 'block' : 'none'
          })
        ).subscribe()!
      )
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
