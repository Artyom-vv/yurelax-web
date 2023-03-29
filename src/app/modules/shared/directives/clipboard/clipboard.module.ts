import {NgModule} from "@angular/core";
import {ClipboardDirective} from "./clipboard.directive";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [MatSnackBarModule],
  exports: [
    ClipboardDirective
  ],
  declarations: [ClipboardDirective]
})
export class ClipboardModule {}
