import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from './profile-header.component';
import {IconModule} from "../../../../../shared/modules/icon/icon.module";



@NgModule({
  declarations: [
    ProfileHeaderComponent
  ],
  exports: [
    ProfileHeaderComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class ProfileHeaderModule { }
