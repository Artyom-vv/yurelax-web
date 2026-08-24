import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding, Inject, Input, OnDestroy,
  ViewChild
} from '@angular/core';
import {animate, query, state, style, transition, trigger} from "@angular/animations";
import {
  BASE_COMPONENT_INPUT_TOUCHED
} from "../../../text-fields/directives/base-component-input.directive";
import {Observable, tap} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'yrx-error-hint',
    templateUrl: './error-hint.component.html',
    styleUrls: ['./error-hint.component.scss'],
    animations: [
        trigger('dynamicHeight', [
            state('default', style({
                height: '0px'
            })),
            state('slideDown', style({
                height: '{{endHeight}}px'
            }), { params: { endHeight: 0 } }),
            transition('default => slideDown', [
                animate('.2s ease-in-out')
            ]),
            transition(':leave', [
                style({
                    height: '{{endHeight}}px'
                }),
                animate('.2s 1ms ease-in-out', style({
                    height: '0px',
                })),
                query('.text', [
                    style({
                        opacity: 1,
                        transform: 'translateY(0)'
                    }),
                    animate('.2s ease-in-out', style({
                        opacity: 0,
                        transform: 'translateY(-100%)'
                    })),
                ]),
            ]),
        ])
    ],
    standalone: false
})
export class ErrorHintComponent implements AfterViewInit {

  @Input({required: true}) text: string = ''

  animation: string = 'default';
  height: number = 0;

  @ViewChild('hintOverflow', {static: true}) hintOverflow!: ElementRef<HTMLDivElement>

  @HostBinding('@dynamicHeight') get dynamicHeight() {
    return {
      value: this.animation,
      params: {startHeight: 0, endHeight: this.height}
    }
  }

  constructor(
    @Inject(BASE_COMPONENT_INPUT_TOUCHED) private touched$: Observable<boolean>,
  ) {
  }

  ngAfterViewInit() {
    this.touched$.pipe(
      tap((value) => {
        setTimeout(() => {
          this.height = this.hintOverflow.nativeElement.clientHeight
          this.animation = 'slideDown';
        })
      }),
      untilDestroyed(this)
    ).subscribe()
  }

}
