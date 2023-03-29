import {NgModule} from "@angular/core";
import {PasswordHiderDirective} from "./password-hider.directive";

@NgModule({
  exports: [
    PasswordHiderDirective
  ],
  declarations: [PasswordHiderDirective]
})
export class PasswordHiderModule {}
