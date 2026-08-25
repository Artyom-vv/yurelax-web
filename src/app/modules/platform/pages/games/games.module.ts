import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ClipboardModule} from '../../../shared/directives/clipboard/clipboard.module';
import {IconModule} from '../../../shared/modules/icon/icon.module';
import {RefIconModule} from '../../../shared/modules/ref-icon/ref-icon.module';
import {GamesComponent} from './games.component';

@NgModule({
  declarations: [GamesComponent],
  imports: [CommonModule, ClipboardModule, IconModule, RefIconModule,
    RouterModule.forChild([{path: '', component: GamesComponent, title: 'Игровые режимы — Yurelax'}])],
})
export class GamesModule {}
