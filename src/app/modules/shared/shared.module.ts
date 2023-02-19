import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedComponent} from './shared.component';
import {RouterModule} from "@angular/router";
import {SvgSpritesComponent} from './components/svg-sprites/svg-sprites.component';
import {ToolsService} from "./services/global/tools.service";
import {HttpClientModule} from "@angular/common/http";
import { PreloaderComponent } from './components/preloader/preloader.component';
import {IconModule} from "./modules/icon/icon.module";
import {SpacingModule} from "./modules/spacing/spacing.module";

@NgModule({
  declarations: [
    SharedComponent,
    SvgSpritesComponent,
    PreloaderComponent,
  ],
  exports: [
    SharedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    IconModule,
    SpacingModule
  ],
  providers: [ToolsService]
})
export class SharedModule {
}
