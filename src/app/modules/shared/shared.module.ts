import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedComponent} from './shared.component';
import {RouterModule} from "@angular/router";
import {SvgSpritesComponent} from './components/svg-sprites/svg-sprites.component';

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
  ]
})
export class SharedModule {
}
