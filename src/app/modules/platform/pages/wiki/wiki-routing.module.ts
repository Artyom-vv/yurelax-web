import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {WikiHomeComponent} from "./pages/wiki-home/wiki-home.component";
import {WikiPageComponent} from "./pages/wiki-page/wiki-page.component";
import {WikiComponent} from "./wiki.component";


const routes: Routes = [
  {
    path: '',
    component: WikiComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: WikiHomeComponent, title: 'Вики'},
      {path: ':page', component: WikiPageComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule {
}
