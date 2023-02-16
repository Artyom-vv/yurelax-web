import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import {HeaderModule} from "../../../shared/modules/header/header.module";
import {LayoutModule} from "../../../shared/modules/layout/layout.module";



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HeaderModule,
    LayoutModule
  ]
})
export class ProfileModule { }
