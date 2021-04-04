import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SearchRoutingModule } from "./search-routing.module";
import { SearchShellComponent } from "./search-shell/search-shell.component";
import { SearchYtQueryComponent } from "./search-yt-query/search-yt-query.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { SearchYtResultsComponent } from "./search-yt-results/search-yt-results.component";

@NgModule({
  declarations: [
    SearchShellComponent,
    SearchYtQueryComponent,
    SearchYtResultsComponent,
  ],
  imports: [CommonModule, SearchRoutingModule, FormsModule, SharedModule],
})
export class SearchModule {}
