import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MiniGamesComponent} from "./mini-games.component";

const routes: Routes = [
  {
    path: '',
    component: MiniGamesComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiniGamesRoutingModule {
}
