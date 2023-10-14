import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {WikiHomeComponent} from "./pages/wiki-home/wiki-home.component";
import {RulesComponent} from "./pages/rules/rules.component";
import {WikiComponent} from "./wiki.component";
import {CommandsComponent} from "./pages/commands/commands.component";
import {ModsComponent} from "./pages/mods/mods.component";
import {UpdatesComponent} from "./pages/updates/updates.component";
import {ResourcesComponent} from "./pages/resources/resources.component";


const routes: Routes = [
  {
    path: '',
    component: WikiComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: WikiHomeComponent},
      {path: 'rules', component: RulesComponent},
      {path: 'commands', component: CommandsComponent},
      {path: 'mods', component: ModsComponent},
      {path: 'updates', component: UpdatesComponent},
      {path: 'resources', component: ResourcesComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule {
}
