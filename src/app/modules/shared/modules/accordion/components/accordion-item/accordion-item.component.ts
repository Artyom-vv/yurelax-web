import {
  Component,
  TemplateRef, ViewChild,
} from '@angular/core';
import {ToolsService} from "../../../../services/tools.service";
import {AccordionItemClickEvent} from "./interfaces/accordion-item.interface";
import {BehaviorSubject} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'yrx-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  animations: [
    trigger('open', [
      state('false', style({
        height: '0px',
      })),
      state('true', style({
        height: '*',
      })),
      transition('true <=> false', animate('0.15s ease-in-out')),
    ])
  ]
})
export class AccordionItemComponent {

  constructor(
    private toolsService: ToolsService
  ) {
  }

  @ViewChild('accordionItem') template!: TemplateRef<any>
  onClick$: BehaviorSubject<AccordionItemClickEvent | null> = new BehaviorSubject<AccordionItemClickEvent | null>(null)

  public id: string = this.toolsService.generateId();
  public open: boolean = false;

  public setOpen(b: boolean) {
    this.open = b;
  }

  public onClickHandler() {
    this.onClick$.next({
      id: this.id
    })
  }
}
