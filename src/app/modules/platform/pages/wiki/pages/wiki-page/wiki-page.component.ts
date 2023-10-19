import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap, tap} from "rxjs";
import {WikiService} from "../../services/wiki.service";
import {WikiPage} from "../../interfaces/wiki.interface";
import {Properties} from "csstype";
import {AppearanceAnimation} from "../../../../../shared/animations/redirect.animation";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'yrx-wiki-page',
  templateUrl: './wiki-page.component.html',
  styleUrls: ['./wiki-page.component.scss'],
  animations: [AppearanceAnimation]
})
export class WikiPageComponent implements OnInit {

  public page?: WikiPage
  public loading$: Observable<boolean> = this.wikiService.loading$.asObservable()
  public styles: Properties = {
    borderRadius: '6px',
    height: '90px'
  };
  public pageName: string = 'appearance';

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private wikiService: WikiService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.pageName = params.get('page')!
        return this.wikiService.getPage(this.pageName)
      }),
      tap(data => {
        this.page = data;
        this.titleService.setTitle(`Вики — ${data.metadata['title']}`);
      }),
    ).subscribe();
  }

  redirect(url: string) {
    const a = document.createElement("a")
    a.href = url
    a.target = '_blank'
    a.click()
  }

  getSpacingType(value: string): any {
    return value;
  }
}
