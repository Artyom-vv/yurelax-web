import {AfterViewInit, Component, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Properties} from "csstype";

@Component({
  selector: 'yrx-wiki-picture',
  templateUrl: './wiki-picture.component.html',
  styleUrls: ['./wiki-picture.component.scss']
})
export class WikiPictureComponent implements AfterViewInit {

  @Input() src: string = ''
  @Input() alt: string = ''
  @Input() description: string = ''

  public loading$ = new BehaviorSubject<boolean>(false)
  public styles: Properties = {
    borderRadius: '6px',
    width: '100%',
    height: '288px',
  };

  ngAfterViewInit() {
    this.loading$.next(!!this.src)
  }

  onLoad() {
    this.loading$.next(false)
  }
}
