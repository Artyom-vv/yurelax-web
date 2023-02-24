import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailCodeVerificationComponent} from './email-code-verification.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthHeaderModule} from "../auth-header/auth-header.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {MatInputModule} from "@angular/material/input";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {LinkModule} from "../../../shared/modules/link/link.module";
import {InputEventDirective} from "./directives/input-event/input-event.directive";


@NgModule({
  declarations: [
    EmailCodeVerificationComponent,
    InputEventDirective
  ],
  exports: [
    EmailCodeVerificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthHeaderModule,
    SpacingModule,
    ButtonModule,
    MatInputModule,
    IconModule,
    LinkModule
  ]
})
export class EmailCodeVerificationModule {
}
