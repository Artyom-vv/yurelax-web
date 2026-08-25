import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminCommerceComponent} from './admin-commerce.component';

const routes: Routes = [{path: '', pathMatch: 'full', component: AdminCommerceComponent}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class AdminCommerceRoutingModule {}
