import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchShellComponent } from "./search-shell/search-shell.component";

const routes: Routes = [
  {
    path: "search",
    component: SearchShellComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
