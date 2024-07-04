import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedComponent} from './shared.component';
import {RouterModule} from "@angular/router";
import {SvgSpritesComponent} from './components/svg-sprites/svg-sprites.component';
import {ToolsService} from "./services/tools.service";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {PreloaderComponent} from './components/preloader/preloader.component';
import {IconModule} from "./modules/icon/icon.module";
import {SpacingModule} from "./modules/spacing/spacing.module";

@NgModule({
  declarations: [
    SharedComponent,
    SvgSpritesComponent,
    PreloaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    SpacingModule
  ],
  exports: [
    SharedComponent,
  ],
  providers: [
    ToolsService,
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class SharedModule {
}
