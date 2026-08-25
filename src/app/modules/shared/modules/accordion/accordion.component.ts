import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList,
  ChangeDetectionStrategy
} from '@angular/core';
import {AccordionItemComponent} from "./components/accordion-item/accordion-item.component";
import {AccordionItemClickEvent} from "./components/accordion-item/interfaces/accordion-item.interface";
import {ToolsService} from "../../services/tools.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'yrx-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AccordionComponent implements AfterContentInit, AfterViewInit, OnDestroy {

  constructor(
    private cdr: ChangeDetectorRef,
    private toolsService: ToolsService
  ) {
  }

  @ContentChildren(AccordionItemComponent) items!: QueryList<AccordionItemComponent>;

  private subscriptions: Subscription[] = []

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
    this.items.forEach(item => this.subscriptions.push(
      item.onClick$.subscribe(event => this.onClick(event))
    ))
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  onClick($event: AccordionItemClickEvent | null) {
    if ($event)
    this.items.forEach(item => {
      item.setOpen(item.id === $event.id && !item.open)
    })
  }
}
