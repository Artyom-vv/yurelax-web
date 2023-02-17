import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlatformRoutingModule} from "./platform-routing.module";
import { PlatformComponent } from './platform.component';
import {LayoutModule} from "../shared/modules/layout/layout.module";
import {HeaderModule} from "../shared/modules/header/header.module";
import {HomeModule} from "./modules/home/home.module";


@NgModule({
  declarations: [
    PlatformComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    LayoutModule,
    HeaderModule,
    HomeModule
  ]
})
export class PlatformModule {
}
