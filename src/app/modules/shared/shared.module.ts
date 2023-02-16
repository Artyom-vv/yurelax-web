import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedComponent} from './shared.component';
import {RouterModule} from "@angular/router";
import {SvgSpritesComponent} from './components/svg-sprites/svg-sprites.component';
import {ToolsService} from "./services/global/tools.service";

@NgModule({
  declarations: [
    SharedComponent,
    SvgSpritesComponent,
  ],
  exports: [
    SharedComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [ToolsService]
})
export class SharedModule {
}
