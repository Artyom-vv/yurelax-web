import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {WikiHomeComponent} from "./components/wiki-home/wiki-home.component";
import {WikiComponent} from "./wiki.component";


const routes: Routes = [
  {
    path: '',
    component: WikiComponent,
    children: [
      {path: '', component: WikiHomeComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule {
}
