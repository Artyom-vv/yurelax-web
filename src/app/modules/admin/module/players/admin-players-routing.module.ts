import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPlayersComponent} from './admin-players.component';

const routes: Routes = [{path: '', pathMatch: 'full', component: AdminPlayersComponent}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class AdminPlayersRoutingModule {}
