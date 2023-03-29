import {Directive, HostListener, Input} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Directive({
  selector: '[clipboard]',
})
export class ClipboardDirective {
  constructor(
    private _snackBar: MatSnackBar
  ) {
  }
  @Input() value!: string;
  @HostListener('click') onClick() {
    navigator.clipboard.writeText(this.value).then(() => {
      this._snackBar.open('IP скопирован', 'Хорошо')
    })
  }
}
