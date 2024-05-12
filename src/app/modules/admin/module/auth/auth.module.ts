import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {LoginComponent} from './components/login/login.component';
import {CheckAuthGuard} from "../../../shared/services/guards/check-auth.guard";
import {LayoutModule} from "../../../shared/modules/layout/layout.module";
import {HeaderModule} from "../../../shared/modules/header/header.module";
import {AuthHeaderModule} from "../../../auth/modules/auth-header/auth-header.module";
import {SpacingModule} from "../../../shared/modules/spacing/spacing.module";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {ErrorHintWrapperModule} from "../../../shared/modules/error-hint-wrapper/error-hint-wrapper.module";
import {ButtonModule} from "../../../shared/modules/button/button.module";
import {IconModule} from "../../../shared/modules/icon/icon.module";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {InputModule} from "../../../shared/modules/text-fields/modules/input/input.module";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LayoutModule,
    HeaderModule,
    AuthHeaderModule,
    SpacingModule,
    MatInputModule,
    ReactiveFormsModule,
    ErrorHintWrapperModule,
    ButtonModule,
    MatSnackBarModule,
    IconModule,
    InputModule
  ],
  providers: [CheckAuthGuard]
})
export class AuthModule {
}
