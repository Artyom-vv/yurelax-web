import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {WikiComponent} from "./wiki.component";
import { WikiHomeComponent } from "./pages/wiki-home/wiki-home.component";
import { RulesComponent } from "./pages/rules/rules.component";


const routes: Routes = [
  {
    path: '',
    component: WikiComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        data: {route: 'home'},
        component: WikiHomeComponent
      },
      {
        path: 'rules',
        data: {route: 'rules'},
        component: RulesComponent
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule {
}
