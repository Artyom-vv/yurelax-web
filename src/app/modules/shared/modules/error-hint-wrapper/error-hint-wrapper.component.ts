import {
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {ErrorHintConditionComponent} from "../error-hint-condition/error-hint-condition.component";

@Component({
  host: {
    "[style.display]": 'control?.invalid && control?.touched ? "block" : "none"'
  },
  selector: 'yrx-error-hint-wrapper',
  templateUrl: './error-hint-wrapper.component.html',
  styleUrls: ['./error-hint-wrapper.component.scss'],
})
export class ErrorHintWrapperComponent {
  @Input() control: AbstractControl | null = null;
  @ContentChildren(ErrorHintConditionComponent) hints!: QueryList<ErrorHintConditionComponent>;

  public checkCondition = (condition: string[]): boolean => !!(condition.some(value => this.control?.errors?.[value]) && this.control?.touched)
}
