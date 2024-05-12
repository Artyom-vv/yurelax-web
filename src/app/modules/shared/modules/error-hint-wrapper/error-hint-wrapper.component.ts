import {NgControl} from "@angular/forms";
import {debounceTime, tap} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Component, Input, OnInit, Optional} from "@angular/core";
import {BaseComponentInputDirective} from "../text-fields/directives/base-component-input.directive";

@UntilDestroy()
@Component({
  host: {
    "[style.display]": "isYandexCringe ? display : this.control?.invalid && this.control?.touched ? 'block' : 'none'"
  },
  selector: 'yrx-error-hint-wrapper',
  templateUrl: './error-hint-wrapper.component.html',
  styleUrls: ['./error-hint-wrapper.component.scss'],
})
export class ErrorHintWrapperComponent implements OnInit {
  @Input() isYandexCringe: boolean = false;

  public display: string = 'none'

  get control() {
    return this.baseInput.baseDirective?.control
  }

  constructor(
    public baseInput: BaseComponentInputDirective,
  ) {
  }

  ngOnInit() {
    if (this.isYandexCringe) {
      this.control?.valueChanges.pipe(
        debounceTime(50),
        tap(() => {
          this.display = this.control?.invalid ? 'block' : 'none'
        }),
        untilDestroyed(this)
      ).subscribe()
    }
  }
}
