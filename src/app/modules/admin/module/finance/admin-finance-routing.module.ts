import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminFinanceComponent} from './admin-finance.component';
const routes: Routes = [{path: '', pathMatch: 'full', component: AdminFinanceComponent}];
@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class AdminFinanceRoutingModule {}
