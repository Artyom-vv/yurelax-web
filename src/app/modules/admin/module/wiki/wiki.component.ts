import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ToolsService} from "../../../shared/services/tools.service";
import {WikiService} from "../../../platform/pages/wiki/services/wiki.service";
import {BehaviorSubject, EMPTY, finalize, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";

@Component({
    selector: 'yrx-wiki',
    templateUrl: './wiki.component.html',
    styleUrls: ['./wiki.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class WikiComponent {

  public updating$ = new BehaviorSubject<boolean>(false)

  constructor(
    public toolsService: ToolsService,
    private wikiService: WikiService,
    private _snackBar: MatSnackBar
  ) {
  }


  update() {
    this.updating$.next(true)
    this.wikiService.update().pipe(
      finalize(() => {
        this._snackBar.open('Википедия обновлена', "Хорошо")
        this.updating$.next(false)
      }),
      catchError((err) => {
        this._snackBar.open(err.error.message, "Закрыть")
        return EMPTY
      })
    ).subscribe()
  }
}
